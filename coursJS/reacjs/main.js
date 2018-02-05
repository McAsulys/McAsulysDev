

let character = [
  {
    name: "RedCubbage",
    type: "earth",
    sex: "female",
    age: 22,
    owner : "Topaz",
    own : [],
  },
  {
    name: "Topaz",
    type: "unicorn",
    sex : "female",
    age: 36,
    owner : "NONE",
    own : [
      "RedCubbage",
      "WingHell",
      "WishAmetist",
    ],
  },
  {
    name: "Ruby",
    type: "earth",
    sex : "female",
    age: 39,
    owner : "NONE",
    own : [],
  },
  {
    name: "WingHell",
    type: "fakepegasus",
    sex: "male",
    age: 24,
    owner : "Topaz",
    own : [
      "BlackCacis",
      "WhiteSnow",
    ],
  },
  {
    name: "BlackCacis",
    type: "earth",
    sex: "female",
    age: 16,
    owner : "WingHell",
    own: [],
  },
  {
    name: "WhiteSnow",
    type: "hippogryphe",
    sex: "female",
    age: 21,
    owner: "WingHell",
    own: [],
  },
  {
    name: "Helium",
    type: "pegasus",
    sex: "female",
    age: 22,
    owner : "NONE",
    own : [],
  },
  {
    name: "TayashiGinko",
    type: "unicorn",
    sex: "female",
    age: 21,
    owner: "NONE",
    own : [],
  },
  {
    name: "WishAmetist",
    type: "pegasus",
    sex: "female",
    age: 20,
    owner: "Topaz",
    own: [],
  },
  {
    name: "Obsidian",
    type: "kirin",
    sex : "male",
    age: 34,
    owner: "NONE",
    own: [],
  }
];

function sortByField(field, array){
  /*
  * Trie suivant un champ du tableau. Par ordre alphabetique ou numerique selon les valeur dans le champ
  * Exeption : les champs doivent avoit le même type de valeur dans tout le tableau.
  * Return : Array
  */
  if (array.every(p => Number.isInteger(p[field]))) {
    return array.sort((a,b) => a[field] > b[field]);
  }
  return array.sort((a,b) => a[field].localeCompare(b[field]));
}

function filterFromField(field, array, value, way){
  /*
  * Permet de filtrer par champs avec une valeur spécifique et une operation spécifique
  * LIMIT : way MUST BE < OR > OR <= OR >=
  * par exemple, les personne ayant plus de 13 ans donne :
  * filterFromField("age", array, 13)
  * Exeption : le type du parametre value doit correpondre au type present dans le champ.
  * Return : Array or false.
  */
  if (way == "<") {
    return array.filter(p => p[field] < value);
  }else if (way == ">") {
    return array.filter(p => p[field] > value);
  }else if (way == "<=") {
    return array.filter(p => p[field] <= value);
  }else if (way == ">=") {
    return array.filter(p => p[field] >= value);
  }else {
    console.log("ERROR : way MUST BE < OR > OR <= OR >=");
  }
  return false;
}

function averageFromField(field, array){
  /*
  * Retourn la moyen du tableau sur le champ choisie.
  * Exeption : le field doit contenire des numerique.
  * Return : number
  */
  let filter = array.map(p => p[field]);
  let sum = filter.reduce((a, b) => a += b);
  let avg = sum/array.length;
  return avg;
}

console.log(averageFromField("age", character));

function extractFromField(field, array){
  /*
  * Permet d'extraire un tableau avec les champs selectionnés.
  * Return : Array;
  */
  if (Array.isArray(field)) { //NOT WORKING
    array.map(p => f(p, field));
    function f(p, field){
      let o = {};
      for (let i of field) {
        o[i]=p[i];
      }
      return o; //retourne a tableai d'objet vide.
    }
  }
  return array.map(p => p[field]); //Work !
}

//console.log(extractFromField(["name", "age"], character));

class Poney {
  constructor() {
    this.name = name;
    this.age = age;
    this.type = type;
  }

  show(){
    console.log("le ", this.type, " nommé ",this.name, " à ", this.age, " ans.");
  }
}

class Pegasus extends Poney{
  constructor(){
    super(type, "pegasus");
  }
}

//let wish = new Pegasus("Wish", 20);
//console.log(wish);
