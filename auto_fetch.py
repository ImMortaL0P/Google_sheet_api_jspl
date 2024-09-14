import win32com.client
import time

def refresh_sql_data(excel_file):
    xl = win32com.client.Dispatch("Excel.Application")
    xl.Visible = True  # You can set this to False if you don't want Excel to be visible
    xl.DisplayAlerts = False  # Suppress alerts (e.g., save changes prompt)

    try:
        wb = xl.Workbooks.Open(excel_file)
        ws = wb.Worksheets(1)  # Assuming SQL data is in the first worksheet

        # Refresh all data connections in the workbook
        wb.RefreshAll()

        # Wait for a few seconds to allow data to refresh
        time.sleep(10)

        # Save and close the workbook
        wb.Close(SaveChanges=True)
    except Exception as e:
        print(f"Error refreshing SQL data: {e}")
    finally:
        xl.Quit()

# Replace 'example.xlsx' with the path to your Excel file
refresh_sql_data('SQL Linked Excel File.xlsx')
