import React, { useState } from 'react';
import ReactMde from 'react-mde';
import Markdown from 'markdown-to-jsx';
import { useInput } from 'react-admin';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

const MarkdownInput = ({ helperText, ...props }) => {
  const [tab, setTab] = useState('write');
  const {
    input: { value, onChange, onBlur, onFocus },
    meta: { error, submitError, touched },
    isRequired,
  } = useInput(props);

  return (
    <FormControl
      fullWidth
      className="ra-input-mde"
      error={!!(touched && (error || submitError))}
      required={isRequired}
    >
      <ReactMde
        value={value}
        onChange={onChange}
        onTabChange={setTab}
        generateMarkdownPreview={async (markdown) => (
          <Markdown>{markdown}</Markdown>
        )}
        selectedTab={tab}
        childProps={{
          textArea: {
            onBlur: onBlur,
            onFocus: onFocus,
          },
        }}
        {...props}
      />
      <FormHelperText variant="outlined">
        {touched && error
          ? error
          : typeof helperText === "string"
          ? helperText
          : null}
      </FormHelperText>
    </FormControl>
  );
};

MarkdownInput.defaultProps = {
  addLabel: true,
};

export default MarkdownInput;
