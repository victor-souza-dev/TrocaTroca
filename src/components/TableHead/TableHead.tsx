import { Data } from '../Table/dataCell';
import { Order } from '../../mock/sortTable';
import { visuallyHidden } from '@mui/utils';
import { headCells } from '../Table/headCell';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { StyledArrowSortTable, StyledHead } from './TableHead.style';
import Box from '@mui/material/Box';
import { StyledCheckbox } from '../../styles/checkbox';
import { useTheme } from '@mui/material';
import { ThemeOptions } from '@mui/material/styles';
import { useSelectedTableStore } from '../../store/useSelectedTableStore';
import { useTableControl } from '../../store/useTableControl';

export function TableHead() {
  const { controls, setControls } = useTableControl();
  const theme: ThemeOptions = useTheme();
  const { getSelectedIsTrueLenght, setAllTable, selectedTable } =
    useSelectedTableStore();

  const rowCount = Object.keys(selectedTable).length;

  const createSortHandler = (property: any) => () => {
    setControls({
      ...controls,
      orderByField: property,
      orderByDirection:
        controls.orderByDirection === 'asc' &&
        controls.orderByField === property
          ? 'desc'
          : 'asc',
    });
  };

  return (
    <StyledHead>
      <TableRow>
        <TableCell padding="checkbox">
          <StyledCheckbox
            indeterminate={
              getSelectedIsTrueLenght() > 0 &&
              getSelectedIsTrueLenght() < rowCount
            }
            checked={rowCount > 0 && getSelectedIsTrueLenght() === rowCount}
            onChange={(event) => setAllTable(event.target.checked)}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            sx={{ padding: '15px 0 !important' }}
          >
            <StyledArrowSortTable
              active={controls.orderByField === headCell.id}
              onClick={createSortHandler(headCell.id)}
              direction={
                controls.orderByField === headCell.id
                  ? controls.orderByDirection
                  : 'asc'
              }
              sx={{
                color: `${theme.palette.text.h1} !important`,
              }}
            >
              {headCell.label}
              {controls.orderByField === headCell.id ? (
                <Box sx={visuallyHidden}>
                  {controls.orderByDirection === 'desc'
                    ? 'sorted descending'
                    : 'sorted ascending'}
                </Box>
              ) : null}
            </StyledArrowSortTable>
          </TableCell>
        ))}
        <TableCell></TableCell>
      </TableRow>
    </StyledHead>
  );
}
