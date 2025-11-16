
# Google Drive Integration Guide

## Overview

Google Drive integration allows you to search for and reference Google Docs, Sheets, and Slides from your PM workflow. This helps keep your Cursor workspace connected to your Google Drive documents.

## Setup

1. Set environment variables in `.env`:
   ```bash
   GOOGLE_API_KEY=your_google_api_key
   ```

2. Get API key from Google Cloud Console:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing
   - Enable Google Drive API
   - Go to Credentials → Create Credentials → API Key
   - Copy the key to your `.env` file

3. **Note**: For full access to read file contents, you may need OAuth 2.0 instead of just an API key. The current implementation provides metadata and search capabilities.

## Usage

### Search for Files

```
@queryGoogleDrive query search searchQuery "project roadmap" fileType document limit 10
```

### List Recent Files

```
@queryGoogleDrive query list fileType document limit 10
```

### Get File Metadata

```
@queryGoogleDrive query file fileId your-file-id-here
```

### List Files in Folder

```
@queryGoogleDrive query folder folderId your-folder-id-here
```

### Filter by Type

```
# Documents only
@queryGoogleDrive query list fileType document

# Spreadsheets only
@queryGoogleDrive query list fileType spreadsheet

# Presentations only
@queryGoogleDrive query list fileType presentation
```

## Use Cases

### In PRDs

Reference Google Docs:

```markdown
## Related Documentation
- Strategy Doc: [Google Doc](https://docs.google.com/document/d/file-id)
- Research Notes: [Query Google Drive for research docs]
```

### In Document Synthesis

Include Google Drive documents:

```
@synthesizeDocuments files=["prd-notifications-v2.md", "google-doc-id-here"]
question="What are the key requirements and decisions?"
```

### In Cross-Project Reports

Link to Google Drive resources:

```markdown
## Resources
- Planning Doc: [Query Google Drive for planning documents]
- Metrics Sheet: [Query Google Drive for metrics spreadsheets]
```

### In Meeting Notes

Reference Google Docs:

```markdown
## Related Docs
- Previous Meeting: [Google Doc](link)
- Action Items: [Google Sheet](link)
```

## File Types

- **Documents**: `application/vnd.google-apps.document`
- **Spreadsheets**: `application/vnd.google-apps.spreadsheet`
- **Presentations**: `application/vnd.google-apps.presentation`

## Getting File IDs

File IDs are in the Google Drive URL:
- `https://docs.google.com/document/d/FILE_ID_HERE/edit`
- `https://docs.google.com/spreadsheets/d/FILE_ID_HERE/edit`
- `https://docs.google.com/presentation/d/FILE_ID_HERE/edit`

## Best Practices

1. **Link, Don't Duplicate**: Reference Google Drive files rather than copying content
2. **Use Search**: Use the search functionality to find related documents
3. **Organize in Folders**: Use folder queries to find documents by project
4. **Keep in Sync**: Update both Cursor docs and Google Drive when content changes

## Limitations

- **Read-Only Metadata**: Current implementation provides file metadata and search, not full content reading
- **API Key Limitations**: For reading file contents, OAuth 2.0 may be required
- **Permissions**: Files must be accessible with the API key (public or shared appropriately)

## Related Templates

- `templates/prd-simple.md` - Product requirements
- `templates/meeting-notes-*.md` - Meeting notes
- `templates/stakeholder-update.md` - Stakeholder updates

