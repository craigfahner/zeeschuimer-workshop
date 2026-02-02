import json
import os
import requests

# --- CONFIG ---
INPUT_FILE = "posts.ndjson"
OUTDIR = "images"
ONLY_NON_FOLLOWING = False  # Set to False to download from all accounts
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)"
}

os.makedirs(OUTDIR, exist_ok=True)


def download_file(url, filename):
    try:
        r = requests.get(url, headers=HEADERS, timeout=10)
        r.raise_for_status()

        content_type = r.headers.get("Content-Type", "")
        if "image" not in content_type:
            print(f"Skipped (not an image): {filename} [{content_type}]")
            return False

        with open(filename, "wb") as f:
            f.write(r.content)

        print(f"Saved {filename}")
        return True

    except Exception as e:
        print(f"Failed {filename}: {e}")
        return False


print("Extracting image thumbnails...")

total_posts = 0
matched_posts = 0
saved_images = 0

with open(INPUT_FILE) as f:
    for line in f:
        total_posts += 1
        post = json.loads(line)

        data = post.get("data", {})
        user = data.get("user", {})
        following = user.get("friendship_status", {}).get("following")

        if ONLY_NON_FOLLOWING and following is not False:
            continue

        post_id = data.get("id")
        if not post_id:
            continue

        candidates = data.get("image_versions2", {}).get("candidates", [])
        if isinstance(candidates, list) and len(candidates) > 0:
            image_url = candidates[0].get("url")
            if image_url:
                matched_posts += 1
                filename = os.path.join(OUTDIR, f"{post_id}.jpg")
                if download_file(image_url, filename):
                    saved_images += 1

print(f"\nTotal posts scanned: {total_posts}")
print(f"Posts matching filter: {matched_posts}")
print(f"Images saved: {saved_images}")
print(f"Done. Images saved to {OUTDIR}/")
