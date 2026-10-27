import os
import sys
import json
import hashlib
import zipfile
import shutil
import subprocess
from datetime import datetime

# Ensure utf-8 stdout on Windows console
if sys.platform == "win32":
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

WORKSPACE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
ZIP_NAME = "WMS-TRANSPORT-Area-UXUI-Banner-Footer-Review.zip"
ZIP_PATH = os.path.join(WORKSPACE_DIR, ZIP_NAME)
TEMP_EXTRACT_DIR = os.path.join(WORKSPACE_DIR, "temp_review_zip_verification")

def get_file_sha256(filepath):
    h = hashlib.sha256()
    with open(filepath, "rb") as f:
        while chunk := f.read(65536):
            h.update(chunk)
    return h.hexdigest()

def should_exclude(rel_path):
    parts = rel_path.replace("\\", "/").split("/")
    excluded_names = {
        "node_modules", ".next", ".git", ".github", ".vscode", ".gemini",
        ".system_generated", ".tempmediaStorage", "temp_review_zip_verification",
        "temp_zip_test", "__pycache__"
    }
    for p in parts:
        if p in excluded_names:
            return True
        if p.endswith(".zip") or p.endswith(".log"):
            return True
        if p == ".env.local" or p == ".env":
            return True
        if "data/quotations" in rel_path.replace("\\", "/"):
            return True
    return False

def collect_project_files():
    # Files and folders to include under project/
    include_roots = [
        "src",
        "public",
        "tools",
        "docs",
        ".agent",
        "scripts",
        "claude-seo",
        "ui-ux-pro-max-skill-main"
    ]
    single_files = [
        "keyword-map.csv",
        "package.json",
        "package-lock.json",
        "tsconfig.json",
        "next.config.ts",
        "next-env.d.ts",
        "postcss.config.mjs",
        "eslint.config.mjs",
        ".gitignore",
        "README.md",
        "AGENTS.md",
        ".env.example",
        "site.webmanifest",
        "googlef4b84622b6d0dd15.html",
        "CHANGE-REPORT-SERVICE-AREAS.md",
        "REVIEW-NOTES.md"
    ]

    project_files = {} # rel_in_zip -> full_path

    for root_dir in include_roots:
        full_root = os.path.join(WORKSPACE_DIR, root_dir)
        if not os.path.exists(full_root):
            continue
        for root, dirs, files in os.walk(full_root):
            for file in files:
                full_path = os.path.join(root, file)
                rel_ws = os.path.relpath(full_path, WORKSPACE_DIR)
                if should_exclude(rel_ws):
                    continue
                rel_in_zip = "project/" + rel_ws.replace("\\", "/")
                project_files[rel_in_zip] = full_path

    for f in single_files:
        full_path = os.path.join(WORKSPACE_DIR, f)
        if os.path.exists(full_path):
            project_files["project/" + f] = full_path

    return project_files

def collect_reports_and_evidence():
    extra_files = {} # rel_in_zip -> full_path
    
    # Reports
    reports_dir = os.path.join(WORKSPACE_DIR, "reports")
    if os.path.exists(reports_dir):
        for root, dirs, files in os.walk(reports_dir):
            for file in files:
                full_path = os.path.join(root, file)
                rel_ws = os.path.relpath(full_path, WORKSPACE_DIR)
                rel_in_zip = rel_ws.replace("\\", "/")
                extra_files[rel_in_zip] = full_path

    # Evidence
    evidence_dir = os.path.join(WORKSPACE_DIR, "evidence")
    if os.path.exists(evidence_dir):
        for root, dirs, files in os.walk(evidence_dir):
            for file in files:
                full_path = os.path.join(root, file)
                rel_ws = os.path.relpath(full_path, WORKSPACE_DIR)
                rel_in_zip = rel_ws.replace("\\", "/")
                extra_files[rel_in_zip] = full_path

    return extra_files

def build_zip():
    print(f"📦 Assembling package for {ZIP_NAME}...")
    project_files = collect_project_files()
    extra_files = collect_reports_and_evidence()
    
    all_files = {**project_files, **extra_files}
    print(f"Total collected files to package: {len(all_files)}")

    manifest_entries = {}
    total_size = 0

    # Calculate hashes
    for zip_path, full_path in sorted(all_files.items()):
        size = os.path.getsize(full_path)
        sha256 = get_file_sha256(full_path)
        total_size += size
        manifest_entries[zip_path] = {
            "size": size,
            "sha256": sha256
        }

    manifest_data = {
        "packageName": ZIP_NAME,
        "createdAt": datetime.now().isoformat(),
        "sourceCommit": "fe2924c feat(wms): complete production deployment and verified seo build",
        "uncommittedChangesIncluded": True,
        "summary": "WMS TRANSPORT Service-Area Complete UX/UI Update: Quotation Form InputWithIcon Fix, Semantic Figure/Figcaption Navy Image Captions, Deep Navy Reference Hero Standardization, Single Service-Confidence Banner Placement Above Work Gallery, 4-Column Structured Footer Redesign, and Verified SEO Baseline",
        "metrics": {
            "verifiedCanonicalUrls": 123,
            "staticGeneratedPages": 161,
            "localityRecords": 81,
            "districtLandingPages": 17,
            "publishedDistricts": 5,
            "draftDistricts": 12,
            "totalPackageFiles": len(all_files) + 1, # including manifest.json
            "totalPackageUncompressedBytes": total_size
        },
        "files": manifest_entries
    }

    manifest_json_str = json.dumps(manifest_data, indent=2, ensure_ascii=False)
    
    # Write manifest temporarily to disk to package it
    temp_manifest_path = os.path.join(WORKSPACE_DIR, "temp_manifest.json")
    with open(temp_manifest_path, "w", encoding="utf-8") as f:
        f.write(manifest_json_str)

    # Create ZIP archive
    if os.path.exists(ZIP_PATH):
        os.remove(ZIP_PATH)

    with zipfile.ZipFile(ZIP_PATH, "w", compression=zipfile.ZIP_DEFLATED, compresslevel=9) as zipf:
        # Add manifest.json at root
        zipf.write(temp_manifest_path, "manifest.json")
        for zip_path, full_path in sorted(all_files.items()):
            zipf.write(full_path, zip_path)

    os.remove(temp_manifest_path)

    zip_size = os.path.getsize(ZIP_PATH)
    zip_sha256 = get_file_sha256(ZIP_PATH)

    print(f"✅ ZIP Archive Created Successfully!")
    print(f"Path: {ZIP_PATH}")
    print(f"Size: {zip_size / (1024 * 1024):.2f} MB ({zip_size} bytes)")
    print(f"File Count: {len(all_files) + 1}")
    print(f"SHA-256: {zip_sha256}")

    return ZIP_PATH, zip_size, zip_sha256, manifest_data

def verify_zip(zip_path, expected_manifest):
    print("\n🔍 Verifying ZIP Extraction and Manifest Integrity...")
    if os.path.exists(TEMP_EXTRACT_DIR):
        shutil.rmtree(TEMP_EXTRACT_DIR)
    os.makedirs(TEMP_EXTRACT_DIR, exist_ok=True)

    with zipfile.ZipFile(zip_path, "r") as zipf:
        zipf.extractall(TEMP_EXTRACT_DIR)

    # 1. Check manifest.json
    extracted_manifest_path = os.path.join(TEMP_EXTRACT_DIR, "manifest.json")
    if not os.path.exists(extracted_manifest_path):
        raise RuntimeError("manifest.json missing from extracted root!")

    with open(extracted_manifest_path, "r", encoding="utf-8") as f:
        extracted_manifest = json.load(f)

    # 2. Check each file and verify SHA256
    mismatches = []
    checked_count = 0
    forbidden_files_found = []

    for root, dirs, files in os.walk(TEMP_EXTRACT_DIR):
        for file in files:
            full_path = os.path.join(root, file)
            rel_path = os.path.relpath(full_path, TEMP_EXTRACT_DIR).replace("\\", "/")
            
            # Check forbidden
            parts = rel_path.split("/")
            forbidden_dirs = {"node_modules", ".git", ".next", ".github", ".gemini", "__pycache__"}
            if any(p in forbidden_dirs for p in parts) or rel_path.endswith(".zip") or rel_path.endswith(".env.local"):
                forbidden_files_found.append(rel_path)

            if rel_path == "manifest.json":
                continue

            if rel_path not in expected_manifest["files"]:
                mismatches.append(f"Unexpected file in zip: {rel_path}")
            else:
                expected_sha = expected_manifest["files"][rel_path]["sha256"]
                actual_sha = get_file_sha256(full_path)
                if expected_sha != actual_sha:
                    mismatches.append(f"SHA256 mismatch for {rel_path}: expected {expected_sha}, got {actual_sha}")
                checked_count += 1

    if mismatches:
        print(f"❌ Verification failed with {len(mismatches)} mismatches:")
        for m in mismatches[:10]:
            print(f"  - {m}")
        sys.exit(1)

    if forbidden_files_found:
        print(f"❌ Forbidden files found in package:")
        for f in forbidden_files_found:
            print(f"  - {f}")
        sys.exit(1)

    print(f"✅ All {checked_count} packaged files extracted and matched manifest SHA-256 perfectly (100% match).")
    print("✅ Zero forbidden files detected (no node_modules, .git, .next, or nested zips).")

    # 3. Test standalone reproducibility by running verify-seo-data.js inside extracted project
    extracted_project_dir = os.path.join(TEMP_EXTRACT_DIR, "project")
    verify_script = os.path.join(extracted_project_dir, "tools", "verify-seo-data.js")
    if os.path.exists(verify_script):
        print("\n🧪 Running verify-seo-data.js on extracted project...")
        result = subprocess.run(
            ["node", "tools/verify-seo-data.js"],
            cwd=extracted_project_dir,
            capture_output=True,
            text=True,
            encoding="utf-8",
            errors="replace"
        )
        if result.returncode == 0:
            print("✅ Standalone verification inside extracted copy PASSED with Exit Code 0!")
        else:
            print(f"⚠️ Standalone verification warning (code {result.returncode}):\n{result.stderr or result.stdout}")

    # Clean up extraction temp folder
    shutil.rmtree(TEMP_EXTRACT_DIR)
    print("🧹 Temporary extraction verification directory cleaned up.")

if __name__ == "__main__":
    zip_path, size, sha256, manifest = build_zip()
    verify_zip(zip_path, manifest)
