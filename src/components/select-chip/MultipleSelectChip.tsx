import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import * as React from 'react';

interface TagInputProps {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function TagInput({ tags, setTags }: TagInputProps) {
  const theme = useTheme();
  // const [tags, setTags] = React.useState<string[]>([]);
  const [inputValue, setInputValue] = React.useState<string>('');

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      setTags((prevTags) => [...prevTags, inputValue.trim()]);
      setInputValue('');
      event.preventDefault();
    }
  };

  const handleDelete = (index: number) => () => {
    setTags((prevTags) => prevTags.filter((_, i) => i !== index));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            padding: '8px',
            background: '#04040433',
            border: '1px solid #A768FD',
            borderRadius: tags.length > 5 ? 4 : 50,
            minHeight: 48,
          }}
        >
          {tags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              onDelete={handleDelete(index)}
              style={{ color: '#FFF', background: '#FFFFFF1F', margin: '4px' }}
            />
          ))}
          <TextField
            variant="outlined"
            placeholder='Type and press Enter'
            value={inputValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            InputProps={{
              style: {
                background: 'transparent',
                color: '#FFF',
                padding: '8.5px 4px',
              },
            }}
            inputProps={{
              style: {
                color: '#FFFFFF99',
                padding: '0',
                marginLeft: tags.length > 0 ? '4px' : '0',
                flex: '1 1 auto',
              },
            }}
            sx={{
              '.MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
              marginLeft: '4px',
              flex: '1 1 auto',
            }}
          />
        </Box>
      </FormControl>
    </div>
  );
}
