# download_images.py
#
# Downloads the image from each Instagram post in a Zeeschuimer export.
#
# Usage:
#     python download_images.py posts.ndjson
#     python download_images.py posts.ndjson images_nov8    (custom output folder)
#
# Instagram's image links expire after 12-24 hours, so run this on a recent export.

import json      # parses each line of the NDJSON file
import os        # creates the output folder and builds file paths
import requests  # fetches images from the web (a third-party library)
import sys       # reads the filename given on the command line

# sys.argv holds the words typed on the command line. Position 0 is the script
# name, so position 1 is the file you passed in:
INPUT_FILE = sys.argv[1]

# Folder where images are saved, relative to where you run the script. This is
# the optional second word after the script name. If you leave it out, images go
# in an "images" subfolder. Images with the same name in that folder get
# overwritten, so use a new folder name to keep earlier captures:
OUTDIR = sys.argv[2] if len(sys.argv) > 2 else "images"

ONLY_NON_FOLLOWING = False  # Set to False to download from all accounts
# Set to True to keep only posts from accounts you don't follow (e.g. suggested posts and ads) - your ethics guidelines may require this

# Forms request headers that match the browser that generated the NDJSON file:
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)"
}

# Create the output folder. exist_ok=True means no error if it's already there.
os.makedirs(OUTDIR, exist_ok=True)


# Downloads one URL and saves it to filename.
# Returns True if an image was saved, False otherwise.
def download_file(url, filename):
    # If anything in the "try" block fails (a bad connection, an expired link),
    # Python jumps to "except", so one failed image doesn't stop the whole run.
    try:
        # Request the image, giving up after 10 seconds without a response.
        r = requests.get(url, headers=HEADERS, timeout=10)

        # Treat HTTP error responses (e.g. 403 or 404) as failures.
        r.raise_for_status()

        # Make sure the server sent an image and not, say, an HTML error page.
        content_type = r.headers.get("Content-Type", "")
        if "image" not in content_type:
            print(f"Skipped (not an image): {filename} [{content_type}]")
            return False

        # "wb" means write in binary mode, which is needed for image data.
        # An existing file with the same name is overwritten.
        with open(filename, "wb") as f:
            f.write(r.content)

        print(f"Saved {filename}")
        return True

    except Exception as e:
        print(f"Failed {filename}: {e}")
        return False


print("Extracting image thumbnails...")

# Running totals, printed in the summary at the end.
total_posts = 0
matched_posts = 0
saved_images = 0

# NDJSON has one JSON object per line, so we read the file line by line.
with open(INPUT_FILE) as f:
    for line in f:
        total_posts += 1

        # Turn this line of text into a Python dictionary.
        post = json.loads(line)

        # Zeeschuimer stores the original Instagram post under the "data" key.
        # Using .get(key, {}) gives an empty dictionary when a key is missing,
        # so the lookups below don't crash on incomplete posts.
        data = post.get("data", {})
        user = data.get("user", {})

        # True if you follow the account, False if not, None if not recorded.
        following = user.get("friendship_status", {}).get("following")

        # When the filter is on, skip anything not explicitly marked as
        # not followed.
        if ONLY_NON_FOLLOWING and following is not False:
            continue

        # The post ID becomes the filename, so skip posts that don't have one.
        post_id = data.get("id")
        if not post_id:
            continue

        # Instagram lists each image at several sizes, called "candidates".
        candidates = data.get("image_versions2", {}).get("candidates", [])

        # Only continue if there's at least one size to choose from.
        if isinstance(candidates, list) and len(candidates) > 0:
            # Take the first size listed. Each post gets one image: for
            # carousels that's the cover, and for videos it's the thumbnail.
            image_url = candidates[0].get("url")
            if image_url:
                matched_posts += 1

                # Build the save path, e.g. images/3828214581177566955_52491273.jpg
                filename = os.path.join(OUTDIR, f"{post_id}.jpg")

                # download_file returns True on success, so count only those.
                if download_file(image_url, filename):
                    saved_images += 1

# Print a summary. If "Images saved" is much lower than "Posts matching filter",
# check the messages above: the links in your export may have expired.
print(f"\nTotal posts scanned: {total_posts}")
print(f"Posts matching filter: {matched_posts}")
print(f"Images saved: {saved_images}")
print(f"Done. Images saved to {OUTDIR}/")
