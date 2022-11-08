import { createRef, RefObject, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';

import BackspaceIcon from '@mui/icons-material/Backspace';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

import { commitEditQuoteMutation } from '../relay/quotes/EditQuoteMutation';
import relayEnvironment from '../relay/relayEnvironment';
import { QuoteField } from './QuoteField';


interface QuoteProps {
  id: string;
  author: string;
  quote: string;
}


export default function Quote(props: QuoteProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false)

  const authorRef: RefObject<any> = createRef()
  const quoteRef: RefObject<any> = createRef()

  function handleEditButton(): any {
    if (isEditing === false) {
      setIsEditing(true)
      return
    } else {
      // The user is trying to save the editing.
      commitEditQuoteMutation(
        relayEnvironment,
        props.id,
        quoteRef.current.getContent(),
        authorRef.current.getContent())
      setIsEditing(false)
    }
  }

  return (
    <Card sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'}}>

        <QuoteField
        type="quote"
        content={props.quote}
        isEditing={isEditing}
        ref={quoteRef}/>
      
        <QuoteField
        type="author"
        content={props.author}
        isEditing={isEditing}
        ref={authorRef}/>

        <Box sx={{minWidth: "20%", marginTop: "15px"}}>
            <Button
            size="small"
            color="error"
            variant="contained"
            sx={{ height: "100%", width: "50%", borderRadius: 0, borderBottomLeftRadius: 4}}>
                {isEditing? <CancelIcon/> : <BackspaceIcon/>}
            </Button>
            <Button
            onClick={() => handleEditButton()}
            size="small"
            color={isEditing? "primary" : "success"}
            variant="contained"
            sx={{ height: "100%", width: "50%", padding: "10px", borderRadius: 0, borderBottomRightRadius: 4}}>
                {isEditing? <SaveIcon/> : <EditIcon/>}
            </Button>
        </Box>
    </Card>
  );
}