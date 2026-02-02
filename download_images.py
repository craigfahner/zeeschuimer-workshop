import json
import os
import requests

INPUT_FILE = "posts.ndjson"
OUTDIR = "images"
HEADERS = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)"}

os.makedirs(OUTDIR, exist_ok=True)

def download_file(url, filename):
    try:
        r = requests.get(url, headers=HEADERS, timeout=10)
        r.raise_for_status()
        with open(filename, "wb") as f:
            f.write(r.content)
        print(f"✅ Saved {filename}")
    except Exception as e:
        print(f"⚠️ Failed {filename}: {e}")

print("Extracting image/video URLs from non-followed accounts...")

total_posts = 0
non_followed_posts = 0
downloaded_count = 0

with open(INPUT_FILE) as f:
    for line in f:
        total_posts += 1
        post = json.loads(line)
        following = post.get("data", {}).get("user", {}).get("friendship_status", {}).get("following")
        if following == False:
            non_followed_posts += 1
            post_id = post["data"]["id"]

            # Thumbnail image
            thumb_url = post["data"].get("image_versions2", {}).get("candidates", [{}])[0].get("url")
            if thumb_url:
                download_file(thumb_url, os.path.join(OUTDIR, f"{post_id}_thumb.jpg"))
                downloaded_count += 1

            # Video thumbnail
            video_versions = post["data"].get("video_versions")
            if isinstance(video_versions, list) and len(video_versions) > 0:
                video_thumb_url = video_versions[0].get("url")
                if video_thumb_url:
                    download_file(video_thumb_url, os.path.join(OUTDIR, f"{post_id}_video_thumb.jpg"))
                    downloaded_count += 1

print(f"Total posts: {total_posts}")
print(f"Posts from non-followed accounts: {non_followed_posts}")
print(f"Found {downloaded_count} image/video thumbnails")
print(f"Done. Thumbnails saved to {OUTDIR}/")
