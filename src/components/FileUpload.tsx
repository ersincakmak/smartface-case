import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em;
  gap: 1em;
  width: min(37.5rem, 100%); // 600px
  background-color: ${(props) => props.theme.colors.background};
  border-radius: 10px;
  margin: auto auto;

  h2 {
    text-align: center;
  }
`;

const DropZone = styled.div`
  padding: 3em 2em;
  border: 1px dashed black;
  cursor: pointer;

  p {
    width: 100%;
    text-align: center;
    margin-top: 0.1em;
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1em;
`;

const Button = styled.button`
  display: inline-block;
  padding: 0.3em 0.5em;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${(props) => props.theme.colors.button.primary.base};
  :hover {
    background-color: ${(props) => props.theme.colors.button.primary.hovered};
  }
  :disabled {
    cursor: no-drop;
    :hover {
      background-color: ${(props) => props.theme.colors.button.primary.base};
    }
  }
  border-radius: 5px;
`;

const CancelButton = styled(Button)`
  background-color: ${(props) => props.theme.colors.text.error.base};
  color: white;
  :hover {
    background-color: ${(props) => props.theme.colors.text.error.hovered};
  }
`;

interface Props {
  onSubmit: (file: any) => void;
  onCancel: () => void;
}

const FileUpload: React.FC<Props> = ({ onCancel, onSubmit }) => {
  const [file, setfile] = useState<any>(undefined);

  useEffect(() => {
    return () => {
      setfile(undefined);
    };
  }, []);

  const onDrop = useCallback((acceptedFiles) => {
    setfile(URL.createObjectURL(acceptedFiles[0]));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: "image/png, image/jpg, image/jpeg, application/pdf",
  });

  return (
    <Container>
      <h2>Upload File</h2>
      <DropZone {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <>
            <p>Drag and drop some file here, or click to select file</p>
            <p>
              <i>Only *.png, *.jpg, *.jpeg and *.pdf file will be accepted</i>
            </p>
          </>
        )}
      </DropZone>
      {file && (
        <a href={file} download="preview">
          Download
        </a>
      )}
      <Buttons>
        <Button disabled={file === undefined} onClick={() => onSubmit(file)}>
          Upload
        </Button>
        <CancelButton color="error" onClick={onCancel}>
          Cancel
        </CancelButton>
      </Buttons>
    </Container>
  );
};

export default FileUpload;
