#!/usr/bin/env python3
"""
TSX to JSON Database Parser
A powerful Python script to convert .tsx export data into structured JSON database format.

Usage: python tsx_parser.py
"""

import re
import json
import os
import sys
from datetime import datetime
from typing import Dict, List, Any, Optional
import random
import string

class TSXParser:
    def __init__(self):
        self.exports = {}
        self.errors = []
        
    def generate_id(self, prefix: str = "item") -> str:
        """Generate a unique ID with timestamp and random string"""
        timestamp = int(datetime.now().timestamp() * 1000)
        random_str = ''.join(random.choices(string.ascii_lowercase + string.digits, k=9))
        return f"{prefix}_{timestamp}_{random_str}"
    
    def get_current_iso_date(self) -> str:
        """Get current date in ISO format"""
        return datetime.now().strftime("%Y-%m-%d")
    
    def get_current_iso_datetime(self) -> str:
        """Get current datetime in ISO format"""
        return datetime.now().isoformat()
    
    def clean_content(self, content: str) -> str:
        """Clean TSX content by removing comments"""
        # Remove block comments
        content = re.sub(r'/\*[\s\S]*?\*/', '', content)
        # Remove line comments
        content = re.sub(r'//.*$', '', content, flags=re.MULTILINE)
        return content
    
    def extract_string_value(self, value: str) -> str:
        """Extract string value handling both single and double quotes"""
        value = value.strip()
        if (value.startswith('"') and value.endswith('"')) or \
           (value.startswith("'") and value.endswith("'")):
            return value[1:-1]
        return value
    
    def parse_array_content(self, array_str: str) -> List[Any]:
        """Parse array content with improved object parsing"""
        array_str = array_str.strip()
        if not (array_str.startswith('[') and array_str.endswith(']')):
            raise ValueError("Invalid array format")
        
        content = array_str[1:-1].strip()
        if not content:
            return []
        
        objects = []
        brace_count = 0
        current_obj = ""
        in_string = False
        quote_char = None
        i = 0
        
        while i < len(content):
            char = content[i]
            
            # Handle string literals
            if char in ['"', "'"] and (i == 0 or content[i-1] != '\\'):
                if not in_string:
                    in_string = True
                    quote_char = char
                elif char == quote_char:
                    in_string = False
                    quote_char = None
            
            if not in_string:
                if char == '{':
                    brace_count += 1
                elif char == '}':
                    brace_count -= 1
                elif char == ',' and brace_count == 0:
                    if current_obj.strip():
                        obj = self.parse_object(current_obj.strip())
                        if obj:
                            objects.append(obj)
                    current_obj = ""
                    i += 1
                    continue
            
            current_obj += char
            i += 1
        
        # Don't forget the last object
        if current_obj.strip():
            obj = self.parse_object(current_obj.strip())
            if obj:
                objects.append(obj)
        
        return objects
    
    def parse_object(self, obj_str: str) -> Optional[Dict[str, Any]]:
        """Parse a single object string into a dictionary"""
        obj_str = obj_str.strip()
        if not (obj_str.startswith('{') and obj_str.endswith('}')):
            return None
        
        content = obj_str[1:-1].strip()
        if not content:
            return {}
        
        obj = {}
        properties = []
        current_prop = ""
        brace_count = 0
        bracket_count = 0
        in_string = False
        quote_char = None
        i = 0
        
        while i < len(content):
            char = content[i]
            
            # Handle string literals
            if char in ['"', "'"] and (i == 0 or content[i-1] != '\\'):
                if not in_string:
                    in_string = True
                    quote_char = char
                elif char == quote_char:
                    in_string = False
                    quote_char = None
            
            if not in_string:
                if char == '{':
                    brace_count += 1
                elif char == '}':
                    brace_count -= 1
                elif char == '[':
                    bracket_count += 1
                elif char == ']':
                    bracket_count -= 1
                elif char == ',' and brace_count == 0 and bracket_count == 0:
                    if current_prop.strip():
                        properties.append(current_prop.strip())
                    current_prop = ""
                    i += 1
                    continue
            
            current_prop += char
            i += 1
        
        # Don't forget the last property
        if current_prop.strip():
            properties.append(current_prop.strip())
        
        # Parse each property
        for prop in properties:
            prop = prop.strip()
            if ':' not in prop:
                continue
                
            # Find the first colon that's not inside a string
            colon_pos = -1
            in_string = False
            quote_char = None
            
            for i, char in enumerate(prop):
                if char in ['"', "'"] and (i == 0 or prop[i-1] != '\\'):
                    if not in_string:
                        in_string = True
                        quote_char = char
                    elif char == quote_char:
                        in_string = False
                        quote_char = None
                elif char == ':' and not in_string:
                    colon_pos = i
                    break
            
            if colon_pos == -1:
                continue
                
            key = prop[:colon_pos].strip()
            value = prop[colon_pos + 1:].strip()
            
            # Clean key (remove quotes if present)
            key = self.extract_string_value(key)
            
            # Parse value
            parsed_value = self.parse_value(value)
            obj[key] = parsed_value
        
        return obj
    
    def parse_value(self, value: str) -> Any:
        """Parse a value string into appropriate Python type"""
        value = value.strip()
        
        # Remove trailing comma if present
        if value.endswith(','):
            value = value[:-1].strip()
        
        # Handle arrays
        if value.startswith('[') and value.endswith(']'):
            return self.parse_array_value(value)
        
        # Handle objects
        if value.startswith('{') and value.endswith('}'):
            return self.parse_object(value)
        
        # Handle JSX elements (convert to string representation)
        if value.startswith('<') and value.endswith('>'):
            return f"{value}"
        
        # Handle React component references (like <FaInstagram/>)
        if value.startswith('<') and '/>' in value:
            return f"REACT_COMPONENT: {value}"
        
        # Handle strings
        if (value.startswith('"') and value.endswith('"')) or \
           (value.startswith("'") and value.endswith("'")):
            return self.extract_string_value(value)
        
        # Handle template literals
        if value.startswith('`') and value.endswith('`'):
            return value[1:-1]  # Simple template literal handling
        
        # Handle booleans
        if value.lower() == 'true':
            return True
        if value.lower() == 'false':
            return False
        
        # Handle null/undefined
        if value.lower() in ['null', 'undefined']:
            return None
        
        # Handle numbers
        try:
            if '.' in value and value.replace('.', '').replace('-', '').isdigit():
                return float(value)
            if value.replace('-', '').isdigit():
                return int(value)
        except ValueError:
            pass
        
        # Default to string (this handles React component references and other complex values)
        return value
    
    def parse_array_value(self, array_str: str) -> List[Any]:
        """Parse array value (for nested arrays and simple arrays)"""
        array_str = array_str.strip()
        if not (array_str.startswith('[') and array_str.endswith(']')):
            return []
        
        content = array_str[1:-1].strip()
        if not content:
            return []
        
        # Simple comma-separated values
        values = []
        current_value = ""
        bracket_count = 0
        brace_count = 0
        in_string = False
        quote_char = None
        
        for i, char in enumerate(content):
            if char in ['"', "'"] and (i == 0 or content[i-1] != '\\'):
                if not in_string:
                    in_string = True
                    quote_char = char
                elif char == quote_char:
                    in_string = False
                    quote_char = None
            
            if not in_string:
                if char == '[':
                    bracket_count += 1
                elif char == ']':
                    bracket_count -= 1
                elif char == '{':
                    brace_count += 1
                elif char == '}':
                    brace_count -= 1
                elif char == ',' and bracket_count == 0 and brace_count == 0:
                    if current_value.strip():
                        values.append(self.parse_value(current_value.strip()))
                    current_value = ""
                    continue
            
            current_value += char
        
        # Don't forget the last value
        if current_value.strip():
            values.append(self.parse_value(current_value.strip()))
        
        return values
    
    def extract_exports(self, content: str) -> Dict[str, List[Any]]:
        """Extract all export const declarations from TSX content"""
        exports = {}
        cleaned_content = self.clean_content(content)
        
        # More flexible pattern that handles arrays ending with ]; or just ]
        # This pattern looks for export const followed by array content until the next export or end of file
        pattern = r'export\s+const\s+(\w+)\s*=\s*(\[[\s\S]*?)(?=\n\s*export\s+const|\n\s*$|$)'
        matches = re.finditer(pattern, cleaned_content, re.DOTALL)
        
        for match in matches:
            var_name = match.group(1)
            var_value = match.group(2).strip()
            
            # Clean up the value - remove trailing semicolon if present
            if var_value.endswith(';'):
                var_value = var_value[:-1].strip()
            
            # Ensure the array ends with ]
            if not var_value.endswith(']'):
                # Find the last ] in the value
                last_bracket = var_value.rfind(']')
                if last_bracket != -1:
                    var_value = var_value[:last_bracket + 1]
            
            # Skip if we've already processed this export
            if var_name in exports:
                continue
            
            try:
                parsed_data = self.parse_array_content(var_value)
                exports[var_name] = parsed_data
                print(f"✅ Successfully parsed '{var_name}' with {len(parsed_data)} items")
            except Exception as e:
                error_msg = f"Failed to parse {var_name}: {str(e)}"
                self.errors.append(error_msg)
                print(f"❌ {error_msg}")
        
        return exports
    
    def enhance_data_items(self, items: List[Dict], collection_name: str) -> List[Dict]:
        """Enhance data items with required database fields"""
        enhanced_items = []
        current_datetime = self.get_current_iso_datetime()
        
        for item in items:
            if not isinstance(item, dict):
                continue
                
            enhanced = item.copy()
            
            # Add required fields if not present
            if 'id' not in enhanced:
                prefix = collection_name.rstrip('s')  # Remove 's' from collection name
                enhanced['id'] = self.generate_id(prefix)
            
            if 'createdAt' not in enhanced:
                enhanced['createdAt'] = current_datetime
            
            if 'updatedAt' not in enhanced:
                enhanced['updatedAt'] = current_datetime
            
            enhanced_items.append(enhanced)
        
        return enhanced_items
    
    def create_database_structure(self, exports: Dict[str, List], 
                                db_name: str = "database", 
                                db_version: str = "1.0") -> Dict[str, Any]:
        """Create the final database structure"""
        database = {
            "metadata": {
                "name": db_name,
                "created": self.get_current_iso_date(),
                "version": db_version
            },
            "collections": {}
        }
        
        for collection_name, items in exports.items():
            enhanced_items = self.enhance_data_items(items, collection_name)
            database["collections"][collection_name] = enhanced_items
        
        return database
    
    def parse_file(self, file_path: str, db_name: str = None, 
                   db_version: str = "1.0") -> Optional[Dict[str, Any]]:
        """Parse a TSX file and return the database structure"""
        try:
            with open(file_path, 'r', encoding='utf-8') as file:
                content = file.read()
            
            if not db_name:
                db_name = os.path.splitext(os.path.basename(file_path))[0]
            
            print(f"📁 Reading file: {file_path}")
            print(f"📊 Database name: {db_name}")
            
            exports = self.extract_exports(content)
            
            if not exports:
                print("❌ No valid export statements found!")
                if self.errors:
                    print("\nErrors encountered:")
                    for error in self.errors:
                        print(f"  • {error}")
                return None
            
            database = self.create_database_structure(exports, db_name, db_version)
            
            print(f"\n✅ Successfully created database with {len(exports)} collections:")
            for collection_name, items in database["collections"].items():
                print(f"  • {collection_name}: {len(items)} items")
            
            return database
            
        except FileNotFoundError:
            print(f"❌ File not found: {file_path}")
            return None
        except Exception as e:
            print(f"❌ Error processing file: {str(e)}")
            return None

def main():
    """Main function to run the TSX parser"""
    print("🚀 TSX to JSON Database Parser")
    print("=" * 40)
    
    # Get input file path
    while True:
        file_path = input("\n📂 Enter the path to your .tsx file: ").strip()
        
        if not file_path:
            print("❌ Please enter a valid file path.")
            continue
        
        # Handle quotes around the path
        if file_path.startswith('"') and file_path.endswith('"'):
            file_path = file_path[1:-1]
        elif file_path.startswith("'") and file_path.endswith("'"):
            file_path = file_path[1:-1]
        
        if not os.path.exists(file_path):
            print(f"❌ File does not exist: {file_path}")
            continue
        
        if not file_path.lower().endswith(('.tsx', '.ts', '.js', '.jsx')):
            print("⚠️  Warning: File doesn't have a .tsx/.ts/.js/.jsx extension")
        
        break
    
    # Get optional database name
    db_name = input("\n🏷️  Enter database name (press Enter for auto): ").strip()
    if not db_name:
        db_name = None
    
    # Get optional version
    db_version = input("📋 Enter version (default: 1.0): ").strip()
    if not db_version:
        db_version = "1.0"
    
    print("\n" + "=" * 40)
    
    # Parse the file
    parser = TSXParser()
    database = parser.parse_file(file_path, db_name, db_version)
    
    if database:
        # Generate output filename
        base_name = os.path.splitext(os.path.basename(file_path))[0]
        output_file = f"{base_name}_database.json"
        
        # Ask user where to save
        save_choice = input(f"\n💾 Save to '{output_file}'? (y/n/custom): ").strip().lower()
        
        if save_choice == 'n':
            print("📄 Here's your JSON database:")
            print(json.dumps(database, indent=2, ensure_ascii=False))
        else:
            if save_choice == 'custom':
                output_file = input("Enter output filename: ").strip()
                if not output_file.endswith('.json'):
                    output_file += '.json'
            
            try:
                with open(output_file, 'w', encoding='utf-8') as f:
                    json.dump(database, f, indent=2, ensure_ascii=False)
                
                print(f"✅ Database saved to: {output_file}")
                print(f"📊 File size: {os.path.getsize(output_file)} bytes")
                
                # Show preview
                preview = input("\n👀 Show preview? (y/n): ").strip().lower()
                if preview == 'y':
                    preview_text = json.dumps(database, indent=2, ensure_ascii=False)
                    if len(preview_text) > 1000:
                        print("📄 Preview (first 1000 characters):")
                        print(preview_text[:1000] + "...")
                    else:
                        print("📄 Complete JSON:")
                        print(preview_text)
                        
            except Exception as e:
                print(f"❌ Error saving file: {str(e)}")
                print("📄 Here's your JSON database instead:")
                print(json.dumps(database, indent=2, ensure_ascii=False))
    
    print("\n" + "=" * 40)
    print("🎉 Thank you for using TSX to JSON Database Parser!")

if __name__ == "__main__":
    main()