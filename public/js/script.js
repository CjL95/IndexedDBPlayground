window.addEventListener('DOMContentLoaded', (event) => {
console.log("Script file connected");
const request = indexedDB.open("notes", 12);

let initData = [{item: "eggs", id: 1},{item: "milk", id: 2},{item: "bread", id: 3}];
let items;
request.onupgradeneeded = e => { //this method is the only place we can modify the db
    alert("upgrade called");
    const db = e.target.result; //event target returns whatever the event was dispatched on. 
                                //in this case, its the indexDB instance. Result returns the result of dispatching the event on it.
    console.log(Object.values(db.objectStoreNames));
    Object.values(db.objectStoreNames).includes("Shopping List") ? '' : createDB(e); //if the database doesn't exist, create it

    function createDB(e){
        const objectStore = db.createObjectStore("Shopping List", { keyPath: "id" }) //keypath is a property that makes an entry unique
        objectStore.createIndex("item","item", {unique: false}); //arguments: field name, keypath, options

        objectStore.transaction.oncomplete = e => {  //once the creation is complete
            const itemObjectStore = db.transaction("Shopping List", "readwrite").objectStore("Shopping List"); 
            //all indexedDB operations must be inside a transaction. it's similar to a query object in other dbs

            initData.forEach(function(i){
                itemObjectStore.add(i); //add the data from the initData array above
            })
        }
    }
    
}
request.onsuccess = e => {
    alert("success called");
    e.target.result.transaction("Shopping List").objectStore("Shopping List").getAll().onsuccess = event => {
        console.log(event.target.result); //display all items in the object store
        event.target.result.forEach(i=>{
            let currentItem = document.createElement('li');
            currentItem.appendChild(document.createTextNode(i.item));
            document.getElementById('items').appendChild(currentItem);
        })
      }
}
request.onerror = e => {
    alert("error! " + e);
}
})