import { useState } from 'react';
import { TableState } from '../components/table/types';
import { getPatternFromColumnId } from '../components/table/utils';

export function useTableState() {
  const [tableState, setTableState] = useState<TableState>({
    selectedPattern: null,
    hoveredCell: null,
    selectedCell: null,
    showAllRows: false,
    mousePosition: { x: 0, y: 0 }
  });

  const handleHeaderClick = (columnId: string) => {
    const pattern = getPatternFromColumnId(columnId);
    if (pattern) {
      setTableState(prev => ({ ...prev, selectedPattern: pattern }));
    }
  };

  const handleCellHover = (row: number, col: string, event: React.MouseEvent) => {
    setTableState(prev => ({
      ...prev,
      hoveredCell: { row, col },
      mousePosition: { x: event.clientX, y: event.clientY }
    }));
  };

  const handleCellClick = (row: number, col: string) => {
    setTableState(prev => ({
      ...prev,
      selectedCell: prev.selectedCell?.row === row && prev.selectedCell?.col === col 
        ? null 
        : { row, col }
    }));
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    setTableState(prev => ({
      ...prev,
      mousePosition: { x: event.clientX, y: event.clientY }
    }));
  };

  const handleMouseLeave = () => {
    setTableState(prev => ({ ...prev, hoveredCell: null }));
  };

  const handleToggleRows = () => {
    setTableState(prev => ({ ...prev, showAllRows: !prev.showAllRows }));
  };

  const handlePatternSelect = (pattern: string | null) => {
    setTableState(prev => ({ ...prev, selectedPattern: pattern }));
  };

  return {
    tableState,
    setTableState,
    handleHeaderClick,
    handleCellHover,
    handleCellClick,
    handleMouseMove,
    handleMouseLeave,
    handleToggleRows,
    handlePatternSelect
  };
}