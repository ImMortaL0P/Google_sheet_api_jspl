import openpyxl
import time

def autosave_excel(filename, interval):
    while True:
        try:
            wb = openpyxl.load_workbook(filename)
            wb.save(filename)
            print(f"Excel file '{filename}' autosaved successfully.")
        except Exception as e:
            print(f"Error autosaving Excel file '{filename}': {e}")
        
        time.sleep(interval * 60)  # Convert minutes to seconds

# Replace 'example.xlsx' with the path to your Excel file
# Replace 10 with the autosave interval in minutes
autosave_excel('SQL Linked Excel File.xlsx', 10)
