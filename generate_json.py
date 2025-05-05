# generate_json.py
import csv
import json
import io
import os

# Define paths relative to the script's location
script_dir = os.path.dirname(os.path.abspath(__file__))
csv_path = os.path.join(script_dir, 'centre_scores.csv')
json_path = os.path.join(script_dir, 'app', 'schools.json')
output_dir = os.path.join(script_dir, 'app')

# Ensure the output directory exists
os.makedirs(output_dir, exist_ok=True)

schools_list = []

try:
    with open(csv_path, 'r', encoding='utf-8') as f_csv:
        reader = csv.DictReader(f_csv)
        for i, row in enumerate(reader):
            try:
                school_data = {
                    "name": row.get("Centre", "").strip(),
                    "cost": int(row.get("Cost", 0)),
                    "education": int(row.get("Education", 0)),
                    "staff": int(row.get("Staff", 0)),
                    "facilities": int(row.get("Facilities", 0)),
                    "reputation": int(row.get("Reputation", 0)),
                    "nqs": int(row.get("NQS", 0)),
                    "address": row.get("Address", "").strip(),
                    # Handle potential missing or non-numeric lat/lng gracefully
                    "lat": float(row.get("Latitude", 0.0) or 0.0),
                    "lng": float(row.get("Longitude", 0.0) or 0.0)
                }
                # Basic validation
                if school_data["name"] and school_data["address"]:
                    schools_list.append(school_data)
                else:
                    print(f"Skipping row {i+1} due to missing name or address: {row}")
            except (ValueError, TypeError) as e:
                print(f"Skipping row {i+1} due to parsing error ({e}): {row}")
                continue

    # Write the JSON output
    with open(json_path, 'w', encoding='utf-8') as f_json:
        json.dump(schools_list, f_json, indent=2)

    print(f"Successfully updated {json_path} with {len(schools_list)} entries.")

except FileNotFoundError:
    print(f"Error: Input CSV file not found at {csv_path}")
except Exception as e:
    print(f"An unexpected error occurred: {e}")
