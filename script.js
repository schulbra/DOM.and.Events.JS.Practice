//-----------------------------------------------------------------------------------------------------------//
//  -Author: Brandon Schultz                                                                                 //
//  -Date: 5-4-20                                                                                            //
//  -Email: schulbra@oregonstate.edu                                                                         //
//  -Description: HW Assignment 4: DOM and Events                                                            //
//  -This file contains code for a page that contains:                                                       //
//   1. A 4x4 table (including a header row).                                                                //
//   2. Three, non-header rows composed of cells that display their row/col value in relation to overall     //
//	 table.                                                                                                  //     
//   3. Four directional buttons (up, down, left right) that allow for navigation of table's non-header      //
//   contents.                                                                                               //
//   4. A button titled "Mark Cell" that changes the background color of the current cell to yellow.         //
//  -Overall purpose for writing code was to obtain practice dynamically creating HTML content               //
//   using JavaScript.                                                                                       //
//-----------------------------------------------------------------------------------------------------------//

//-----------------------------------------------------------------------------------------------------------//
// -Initialization of variables for table and table's features (buttons).                                    //
// -Initialization of variables for maintaining current position of table and cell elements.                 //
//-----------------------------------------------------------------------------------------------------------//

var htmlBody, table4x4, buttonUp, buttonDown, buttonL, buttonR, markButton;
var currentRowVal = 1, currentColumnVal = 0;

//-----------------------------------------------------------------------------------------------------------//
//  -Function used to create and style header cells of table.                                                //
//-----------------------------------------------------------------------------------------------------------//

function createHeaderCell(text)
{
	var header_Cell_Elements = document.createElement('th');
	var thText = document.createTextNode(text);
	header_Cell_Elements.appendChild(thText)
		header_Cell_Elements.style.height = '40px';
	header_Cell_Elements.style.width = '200px';
	header_Cell_Elements.style.border = '1px solid gray';
	return header_Cell_Elements;
}

//-----------------------------------------------------------------------------------------------------------//
//  -Function used to create and style non-header cells of table.                                            //
//-----------------------------------------------------------------------------------------------------------//

function createNonHeaderCell(text)
{
	var non_Header_Cell_Elements = document.createElement('td');
	var tdText = document.createTextNode(text);
	non_Header_Cell_Elements.appendChild(tdText);
	non_Header_Cell_Elements.style.height = '40px';
	non_Header_Cell_Elements.style.width = '200px';
	non_Header_Cell_Elements.style.border = '1px solid gray';
	return non_Header_Cell_Elements;
}

//-----------------------------------------------------------------------------------------------------------//
//  -Function used to create directional buttons for table navigation.                                       //
//-----------------------------------------------------------------------------------------------------------//

function createButton(text)
{
	var buttonElements = document.createElement('button');
	var buttonText = document.createTextNode(text);
	buttonElements.appendChild(buttonText);
	return buttonElements;
}

//-----------------------------------------------------------------------------------------------------------//
//  -Function that initalizes, then calls HTML page.                                                         //
//  -Initialization of tables header row is followed by the addition of elements that will occupy entire     //
//  top row. Header is then appended to the table.                                                           //
//  -Three non-header rows, each containing four elements are then added and appended beneath the header row.//
//  -Completed table is then appended to body.                                                               //
//  -Button comments are provided below                                                                      //
//-----------------------------------------------------------------------------------------------------------//

function html_Initialize()
{
	htmlBody = document.body;
	table4x4 = document.createElement('table');
	var thRow = document.createElement('tr');
	for (var i = 1; i < 5; i++)
	{
		thRow.appendChild(createHeaderCell('Header ' + i))
	}
	table4x4.appendChild(thRow);

	for (var i = 1; i < 4; i++)
	{
		var tdRow = document.createElement('tr');
		for (var j = 1; j < 5; j++)
		{
			tdRow.appendChild(createNonHeaderCell(j + ',' + i));
		}
		table4x4.appendChild(tdRow);
	}

	htmlBody.appendChild(table4x4);
	htmlBody.appendChild(document.createElement('br'));

	buttonUp = createButton('Up');				//Generates "up" button.
	buttonDown = createButton('Down');			//Generates "down" button.
	buttonL = createButton('Left');			    //Generates "left" button.
	buttonR = createButton('Right');		    //Generates "right" button.
	markButton = createButton('Mark Cells');	//Generates "mark cell" button.
	//	Appends buttons to singular row.
	htmlBody.appendChild(buttonUp);
	htmlBody.appendChild(buttonDown);
	htmlBody.appendChild(buttonL);
	htmlBody.appendChild(buttonR);
	//	Line that seperates directional buttons.
	htmlBody.appendChild(document.createElement('br'));
	//	Appends row that contains singular mark cell button to table.
	htmlBody.appendChild(markButton);
}

html_Initialize();								//call the above.

//-----------------------------------------------------------------------------------------------------------//
//  -Function used for managing navigation of table.                                                         //
//  -Should only return non-header row materials.                                                            //
//  -Row 0 = header row	(non-valid cells)	| Row 1-3 = non-header rows (valid cells)	| Columns 0-3 =      //
//  All valid.                                                                                               //
//-----------------------------------------------------------------------------------------------------------//

function currentCellElements(row, col)
{
	if (row < 1 || row > 3 || col < 0 || col > 3)
	{
		return undefined;
	}

	var curCellEle_Row = table4x4.childNodes[row];
	var currentCellElement = curCellEle_Row.childNodes[col];
	return currentCellElement;
}

//-----------------------------------------------------------------------------------------------------------//
//  -Function used in altering boarder styles.                                                               //                                         
//-----------------------------------------------------------------------------------------------------------//

function greyBorderCurrentCell(current, next)
{
	current.style.border = '1px solid gray';
	next.style.border = '2px solid black';
}

var initialCellElements = currentCellElements(currentRowVal, currentColumnVal);
greyBorderCurrentCell(initialCellElements, initialCellElements);

//-----------------------------------------------------------------------------------------------------------//
//  -Event listeners.                                                                                        //
//  -General format is:                                                                                      //
//		-Check that movement direction exists as a valid choice using current row,colu and or future row,col //
//      values.                                                                                              //
//		-If movement option is valid, swap thickened boarder from current cell variable to desired cells.    //
//		-Reassign current cell row/col values to now thickened boardered cell. //phrase better               //
//      -                                                                                                    //
//-----------------------------------------------------------------------------------------------------------//

buttonUp.addEventListener("click", function()
{
	var nextCell = currentCellElements(currentRowVal - 1, currentColumnVal);
	if (nextCell != undefined)
	{
		var currentCell = currentCellElements(currentRowVal, currentColumnVal)
			greyBorderCurrentCell(currentCell, nextCell);
		currentRowVal--;
	}
});

buttonDown.addEventListener("click", function()
{
	var nextCell = currentCellElements(currentRowVal + 1, currentColumnVal);
	if (nextCell != undefined)
	{
		var currentCell = currentCellElements(currentRowVal, currentColumnVal)
			greyBorderCurrentCell(currentCell, nextCell);
		currentRowVal++;
	}
});

buttonL.addEventListener("click", function()
{
	var nextCell = currentCellElements(currentRowVal, currentColumnVal - 1);
	if (nextCell != undefined)
	{
		var currentCell = currentCellElements(currentRowVal, currentColumnVal)
			greyBorderCurrentCell(currentCell, nextCell);
		currentColumnVal--;
	}
});

buttonR.addEventListener("click", function()
{
	var nextCell = currentCellElements(currentRowVal, currentColumnVal + 1);
	if (nextCell != undefined)
	{
		var currentCell = currentCellElements(currentRowVal, currentColumnVal)
			greyBorderCurrentCell(currentCell, nextCell);
		currentColumnVal++;
	}
});

//Mark cell button. 
markButton.addEventListener("click", function()
{
	var yellowCell = currentCellElements(currentRowVal, currentColumnVal);
	yellowCell.style.backgroundColor = "yellow";
});