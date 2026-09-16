import cv2
import json
import os
import sys

def main():
    video_path = r"C:\Freelancing\Protfolio\lib\video\i_need_like_rope_throwing_from (1).mp4"
    output_dir = r"C:\Freelancing\Protfolio\public\frames_climb"
    manifest_path = os.path.join(output_dir, "manifest.json")
    
    os.makedirs(output_dir, exist_ok=True)

    if not os.path.exists(video_path):
        print(f"Error: Video file not found at {video_path}")
        sys.exit(1)

    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        print(f"Error: Cannot open video file {video_path}")
        sys.exit(1)

    fps = cap.get(cv2.CAP_PROP_FPS)
    source_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    source_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    
    print(f"Reading climbing source video: {video_path}")
    print(f"Resolution: {source_width}x{source_height}, FPS: {fps}")

    source_frames = []
    while True:
        ret, frame = cap.read()
        if not ret:
            break
        source_frames.append(frame)
    cap.release()

    source_count = len(source_frames)
    target_count = 360
    quality = 80

    print(f"Loaded {source_count} source frames. Generating {target_count} clean, crisp target frames...")

    total_bytes = 0

    for k in range(target_count):
        t = k * (source_count - 1) / (target_count - 1)
        idx = int(t)
        alpha = t - idx
        
        frame1 = source_frames[idx]
        frame2 = source_frames[min(idx + 1, source_count - 1)]

        if alpha < 0.001:
            blended = frame1
        elif alpha > 0.999:
            blended = frame2
        else:
            blended = cv2.addWeighted(frame1, 1.0 - alpha, frame2, alpha, 0)

        frame_filename = f"climb_frame_{k:03d}.webp"
        frame_filepath = os.path.join(output_dir, frame_filename)

        success = cv2.imwrite(frame_filepath, blended, [cv2.IMWRITE_WEBP_QUALITY, quality])
        if not success:
            print(f"Failed to write {frame_filepath}")
            sys.exit(1)

        frame_size = os.path.getsize(frame_filepath)
        total_bytes += frame_size

        if (k + 1) % 60 == 0 or k == target_count - 1:
            print(f"  Progress: {k + 1}/{target_count} frames written ({frame_size / 1024:.1f} KB)...")

    # Generate Manifest
    manifest = {
        "sequence": "climb",
        "direction": "BOTTOM_TO_TOP",
        "frameCount": target_count,
        "sourceFrameCount": source_count,
        "width": source_width,
        "height": source_height,
        "format": "webp",
        "quality": quality,
        "chunks": [
            { "chunkIndex": 1, "name": "Bottom & Rope Prep", "start": 0, "end": 59, "count": 60 },
            { "chunkIndex": 2, "name": "Lower Ridge Ascent", "start": 60, "end": 119, "count": 60 },
            { "chunkIndex": 3, "name": "Mid-Lower Rock Face", "start": 120, "end": 179, "count": 60 },
            { "chunkIndex": 4, "name": "High Canyon Face", "start": 180, "end": 239, "count": 60 },
            { "chunkIndex": 5, "name": "Upper Snow Ridge", "start": 240, "end": 299, "count": 60 },
            { "chunkIndex": 6, "name": "Summit Arrival", "start": 300, "end": 359, "count": 60 }
        ],
        "totalSizeBytes": total_bytes,
        "avgSizeBytes": total_bytes // target_count
    }

    with open(manifest_path, "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2)

    avg_kb = (total_bytes / target_count) / 1024
    total_mb = total_bytes / (1024 * 1024)

    print("=" * 50)
    print("CLIMB SEQUENCE CLEAN EXTRACTION REPORT:")
    print(f"Total Frames: {target_count}")
    print(f"Resolution: {source_width} x {source_height}")
    print(f"Format: WebP (Quality {quality})")
    print(f"Total Size: {total_mb:.2f} MB")
    print(f"Average Frame Size: {avg_kb:.2f} KB")
    print("=" * 50)

if __name__ == "__main__":
    main()
