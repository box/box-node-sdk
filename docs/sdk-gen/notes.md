# NotesManager


- [Convert content to Box Note](#convert-content-to-box-note)

## Convert content to Box Note

Creates a Box Note (`.boxnote` file) from supported source content. See the `content_format` field for supported formats.

This operation is performed by calling function `createNoteConvertV2026R0`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/v2026.0/post-notes-convert/).

*Currently we don't have an example for calling `createNoteConvertV2026R0` in integration tests*

### Arguments

- requestBodyInput `NotesConvertRequestBodyV2026R0Input`
  - Request body of createNoteConvertV2026R0 method
- optionalsInput `CreateNoteConvertV2026R0OptionalsInput`
  


### Returns

This function returns a value of type `NotesConvertResponseV2026R0`.

The note was created successfully.


