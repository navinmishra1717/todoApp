import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { TodoStatus } from '../../types/todo';

export default function SelectTodoStatus({
    selectStatus,
    handleChangeStatus
}: {
    selectStatus: TodoStatus | undefined;
    handleChangeStatus: (event: SelectChangeEvent) => void;
}) {
    return (
        <FormControl variant="filled" sx={{ m: 1, minWidth: 120, backgroundColor: '#f5f6f7' }}>
            <InputLabel id="demo-simple-select-filled-label">Status</InputLabel>
            <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={selectStatus}
                label="Status"
                onChange={handleChangeStatus}
            >
                <MenuItem value={''}>
                    <em>All</em>
                </MenuItem>
                <MenuItem value={TodoStatus.UPCOMING}>Upcoming</MenuItem>
                <MenuItem value={TodoStatus.DONE}>Done</MenuItem>
            </Select>
        </FormControl>
    );
}
