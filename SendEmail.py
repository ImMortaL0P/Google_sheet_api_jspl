import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders

# Sender's email address and password
sender_email = "kumarmangalam.patna@gmail.com"
sender_password = "cwup ihic brfb lrnd"

# Recipients' email addresses
recipients = ["thelostsofficial@gmail.com"]

# Email content
subject = "Script Test"
body = "Hello"

# Create a multipart message and set headers
message = MIMEMultipart()
message["From"] = sender_email
message["To"] = ", ".join(recipients)
message["Subject"] = subject

# Add body to email
message.attach(MIMEText(body, "plain"))

# PDF file path
pdf_file = r"C:\Users\kumar\Downloads\SMS2-SOP-OP-SLAB-01.pdf"

# Add PDF attachment
with open(pdf_file, "rb") as attachment:
    part = MIMEBase("application", "octet-stream")
    part.set_payload(attachment.read())

encoders.encode_base64(part)
part.add_header("Content-Disposition", f"attachment; filename= {pdf_file}")
message.attach(part)



try:
    # Create SMTP session for sending the email
    smtp = smtplib.SMTP("smtp.gmail.com", 587)
    smtp.starttls()  # Enable TLS
    smtp.login(sender_email, sender_password)  # Login to Gmail SMTP server

    # Send email
    smtp.sendmail(sender_email, recipients, message.as_string())
    print("Email sent successfully.")

except Exception as e:
    print("Failed to send email:", e)
	

finally:
    # Close SMTP connection
    smtp.quit() if 'smtp' in locals() else None
