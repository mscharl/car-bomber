import React, { Component } from 'react';
import classNames from 'classnames';

class Grid extends Component {

    constructor(props) {
        super(props);

        this.state = {
            mouseOverRow: -1,
            mouseOverCell: -1,
        }
    }

    setOnMouseOver(row, cell) {
        this.setState({
            mouseOverRow: row,
            mouseOverCell: cell,
        })
    }

    cellClasses(row, cell) {
        return classNames('Grid__cell', {
            'Grid__cell--highlighted': row === this.state.mouseOverRow || cell === this.state.mouseOverCell,
        });
    }

    render() {
        const charCodeForA = 65;

        const gridSize = 8;
        const row      = (new Array(gridSize)).fill(null);
        const rowIndex = row.map((_, index) => String.fromCharCode(charCodeForA + index));
        const grid     = (new Array(gridSize)).fill(row);

        return (
            <div className="Grid">
                <div className="Grid__body" onMouseOut={() => this.setOnMouseOver(-1, -1)}>
                    { /* Grid header row */ }
                    <div className="Grid__row Grid__row--header">
                        { /* Header-cell of row */ }
                        <div className="Grid__cell Grid__cell--header"></div>
                        { /* Generate cells */ }
                        { row.map((_, column) => (
                            <div className={this.cellClasses(null, column)} key={ column } onMouseOver={() => this.setOnMouseOver(-1, column)}>
                                { column + 1 }
                            </div>
                        )) }
                    </div>

                    { /* Generate rows */ }
                    { grid.map((cells, row) => (
                        <div className="Grid__row" key={ row }>
                            { /* Header-cell of row */ }
                            <div className={this.cellClasses(row, null)} onMouseOver={() => this.setOnMouseOver(row, -1)}>
                                { rowIndex[row] }
                            </div>
                            { /* Generate cells */ }
                            { cells.map((_, cell) => (
                                <div className={this.cellClasses(row, cell)} key={ cell } onMouseOver={() => this.setOnMouseOver(row, cell)}></div>
                            )) }
                        </div>
                    )) }

                    <section className="Grid__battlefield">
                        {this.props.children}
                    </section>
                </div>
            </div>
        );
    }
}

export default Grid;
