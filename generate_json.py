# generate_json.py
import csv
import json
import io
import os

# Define paths relative to the script's location
script_dir = os.path.dirname(os.path.abspath(__file__))
csv_path = os.path.join(script_dir, '../centre_scores_enriched.csv')
json_path = os.path.join(script_dir, 'app', 'schools.json')
output_dir = os.path.join(script_dir, 'app')

# Ensure the output directory exists
os.makedirs(output_dir, exist_ok=True)

schools_list = []
numeric_cols_lower = {
    "cost": int, "education": int, "staff": int, "facilities": int,
    "reputation": int, "nqs": int, "latitude": float, "longitude": float,
    "fee_per_day": float
}
key_mapping = {
    "centre": "name",
    "latitude": "lat",
    "longitude": "lng"
}

try:
    with open(csv_path, 'r', encoding='utf-8') as f_csv:
        reader = csv.DictReader(f_csv)
        print(f"-- Starting CSV Reader loop --")
        for i, row in enumerate(reader):
            print(f"== Processing CSV row {i+2} ==")
            school_data = {}
            valid_row = True
            try:
                for key, value in row.items():
                    if not key:  # Skip empty header columns
                        continue

                    processed_key = key.lower().strip()
                    processed_value = value.strip() if value is not None else None

                    # Rename keys if needed
                    processed_key = key_mapping.get(processed_key, processed_key)

                    # Attempt numeric conversion
                    if processed_key in numeric_cols_lower and processed_value is not None and processed_value != '':
                        try:
                            convert_func = numeric_cols_lower[processed_key]
                            processed_value = convert_func(processed_value)
                        except (ValueError, TypeError):
                            print(f"  Warning: Could not convert '{key}' value '{value}' to {numeric_cols_lower[processed_key].__name__} for row {i+2}. Setting to None.")
                            processed_value = None # Set to None on conversion error
                    elif processed_value == '': # Handle empty strings for non-numeric potentially
                         processed_value = None

                    school_data[processed_key] = processed_value

                # Basic validation (check for name and address after processing)
                if not school_data.get("name") or not school_data.get("address"):
                    print(f"Skipping row {i+2} due to missing name or address after processing.")
                    print(f"  Processed data: {school_data}")
                    valid_row = False

            except Exception as e:
                print(f"Error processing row {i+2}: {e}")
                print(f"  Original row data: {row}")
                valid_row = False

            if valid_row:
                schools_list.append(school_data)
                # Limit printing full data for brevity in logs
                # print(f"  Successfully processed row {i+2}. Data: {school_data}")
                print(f"  Successfully processed row {i+2} for '{school_data.get('name', 'N/A')}'.")


        print(f"-- CSV Reader finished processing. Total valid rows added: {len(schools_list)} --")

except FileNotFoundError:
    print(f"Error: CSV file not found at {csv_path}")
    exit(1)
except Exception as e:
    print(f"Error reading or processing CSV file: {e}")
    exit(1)

# Write the JSON data to a file
try:
    with open(json_path, 'w', encoding='utf-8') as f_json:
        json.dump(schools_list, f_json, indent=4, ensure_ascii=False) # Use json.dump
    print(f"Successfully generated {json_path} with {len(schools_list)} entries.")
except Exception as e:
    print(f"Error writing JSON file: {e}")
    exit(1)
