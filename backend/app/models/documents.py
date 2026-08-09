# this file stores data
documents = []
# upload.py and documents.py(route) accesses the same list so we wrote this in a separate file.
# when python runs models/document.py it creates a list, upload.py uses the same documents list that already exists.  