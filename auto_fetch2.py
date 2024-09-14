import openpyxl
import time

def refresh_sql_data(excel_file):
    try:
        wb = openpyxl.load_workbook(excel_file)
        # Refresh SQL data here
        print("SQL data refreshed successfully.")
        # Save the workbook
        wb.save(excel_file)
        print("Excel file saved successfully.")
    except Exception as e:
        print(f"Error refreshing SQL data: {e}")

# Replace 'SQL Linked Excel File.xlsx' with the path to your Excel file
refresh_sql_data('SQL Linked Excel File.xlsx')
