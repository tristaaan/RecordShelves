#Record Shelves

- Add and remove records at will
- Sort shelf by record attributes
- Drag and drop records between shelves
- Data persistence across page loads

Initial record data is based off of `data/record-shelf.json`, you reset the data to that state by appending the url arguments `/?reset=true`.

##Dependancies
Listed in `package.json` and `js/bower.json`.

##Setup

	npm install
	cd js
	bower install
	gulp serve
