import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import ApprovalTable from './ApprovalTable';
import Tablee from './Table';

function ApprovalPage() {
  return (
    <Box>
    <Typography variant='h2' textAlign='center' color="#D5D5D5"> Approvals</Typography>
    {/* <ApprovalTable/> */}
    <Tablee />
    </Box>
  )
}

export default ApprovalPage