<html>
<head>
	<meta charset='UTF-8'>
	<title>Javascript - TD1 - Exercice 4</title>
    <script type="text/javascript" src="../jquery-3.2.1.min.js"></script>
	<script type="text/javascript" src="exo8.js"></script>
</head>
<style>
img {
	padding : 10px;
	border : 5px solid #ccc;
	border-radius : 10px;
	background-color : black;
	margin : 10px auto;
	width : 100%;

}
.img {
	width : 50%;
	margin : 50px auto;
}

.img b {
	margin : 5px 20px;


}
.etiquette {
	font-size : 90%;
	color : white;
	background-color : orange;
	padding : 1px 7px;
	border-radius : 3px;
	margin : 0 10px;
}

#all {
	position : absolute;

}

#all ul {
	list-style-type : none;
}

</style>
<body>
<div id='all'>
<h3>Liste Possible</h3>
<ul>
<li id='id2' draggable="true">Famille</li>
<li id='id3' draggable="true">Amis</li>
<li id='id4' draggable="true">Vacances</li>
<li id='id5' draggable="true">Eté</li>
<li id='id6' draggable="true">Hiver</li>
<li id='id7' draggable="true">Voyage</li>
</ul>

</div>
<div class='img'>
	<img id='img1' src="surf.jpg" />
	<br />
	<div id='etiquettes'><b>Etiquettes</b><span class='etiquette' id='id1'>Sport</span></div>
</div>

</body>
</html>
