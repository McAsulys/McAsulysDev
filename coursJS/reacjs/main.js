

let character = [
  {
    name: "RedCubbage",
    age: 22,
  },
  {
    name: "Topaz",
    age: 36,
  },
  {
    name: "Ruby",
    age: 39,
  },
  {
    name: "WingHell",
    age: 24,
  },
  {
    name: "BlackCacis",
    age: 16,
  },
  {
    name: "WhiteSnow",
    age: 21,
  },
  {
    name: "Helium",
    age: 22,
  },
  {
    name: "TayashiGinko",
    age: 21,
  },
  {
    name: "WishAmetist",
    age: 20
  },
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
  let j = array.reduce((a, b) => a[field] + b[field]);///array.lenght;
  console.log(j);
}

console.log(averageFromField("age", character));

function extractFromField(field, array){
  /*
  * Permet d'extraire un tableau avec le champs selectionner.
  * Return : Array;
  */
  if (Array.isArray(field)) { //NOT WORKING
    array.map(p => f(p, field));
    function f(p, field){
      let o = {};
      for (let i of field) {
        o[i]=p[i];
      }
      return o;
    }
  }
  return array.map(p => p[field]);
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

let wish = new Pegasus("Wish", 20);
console.log(wish);
