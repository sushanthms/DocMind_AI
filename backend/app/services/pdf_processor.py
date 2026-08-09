import fitz   # PyMuPDF

def extract_text_from_pdf(pdf_path):
# when uplaod.py calls this fucntion pdf_path becomes file_path and gives the path of the file. pdf_path is a variable..
    document = fitz.open(pdf_path)

    text = ""

    for page in document:
        text += page.get_text()

    document.close()

    print(text)

    return text