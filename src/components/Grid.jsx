import DataGrid, {
  Scrolling,
  Paging,
  HeaderFilter,
  Search,
  FilterRow,
  FilterPanel,
  ColumnChooser,
  ColumnChooserSearch,
  ColumnChooserSelection,
} from "devextreme-react/data-grid";
import React from 'react'
import "./Grid.css"

const Grid = ({data}) => {
  return (
            <DataGrid
              dataSource={data} // Use the updated dataSource
              showBorders={true}
              columnAutoWidth={true}
              height="80vh"
              showRowLines={true}
              showColumnLines={false}
              style={{ fontSize: "1px" }}
              remoteOperations={{ filtering: false, paging: true }}
            >
              <Scrolling mode="virtual" rowRenderingMode="virtual" />
              <Paging defaultPageSize={10} />
              {/* <ColumnChooser
                enabled={true}
                height="300px"
                mode="select"
                position={{ my: "right top", at: "right bottom", of: ".dx-datagrid-column-chooser-button" }}
              >
                <ColumnChooserSearch enabled={true} placeholder="Search column" />
                <ColumnChooserSelection allowSelectAll={true} selectByClick={true} recursive={true} />
              </ColumnChooser> */}
              <FilterRow visible={true} />
              <FilterPanel visible={true} />
              <HeaderFilter visible={true}>
                <Search enabled={true} />
              </HeaderFilter>
            </DataGrid>
  )
}

export default Grid