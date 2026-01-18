
let nextBtn=document.getElementById("nextBtn");
 let prevBtn=document.getElementById("prevBtn");
 let allDish=document.querySelectorAll(".dishes");
 let dishBtn=document.querySelectorAll(".dish");

 let count=0;

 allDish.forEach(function(slide,index){
    slide.style.left=`${index * 100}%`
 });

 
function myFun(){
  allDish.forEach(function(curVal){
    curVal.style.transform=`translateX(-${count * 100}%)`;
  });
}

nextBtn.addEventListener("click",function(){
  count++;
  if(count == allDish.length){
    count=0;
  }
  myFun();
})

prevBtn.addEventListener("click",function(){
  count--;
  if(count == -1){
    count=allDish.length-1;
  }
  myFun();
});

function fetchRecipes(query){
   //let searchinput=document.getElementById('searchinput').value;
  let recipesdiv=document.getElementById("recipes");
  let notfounddiv=document.getElementById("notfound");
  recipesdiv.innerHTML='';
  notfounddiv.style.display='none';
  

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
  .then(res =>res.json())
  .then(data =>{
      if(!data.meals){
        notfounddiv.innerHTML="Recipe not found, please try another search"
        notfounddiv.style.display='block';
      }else{
        data.meals.forEach(meal =>{
            const card=document.createElement('div');
            card.classList.add('recipe-card');
            card.innerHTML =`
            <img src="${meal.strMealThumb}"alt="${meal.strMeal}">
            <h3>${meal.strMeal}</h3>
            <p><span>${meal.strArea}</span> Dish</p>
            <p>Belongs to <span>${meal.strCategory}</span> Category</p>
            <button onclick="viewRecipes('${meal.idMeal}')">View Recipes</button>
            `;
            recipesdiv.appendChild(card);
           
        });
      }
  });
}
function searchRecipes(){
  let input=document.getElementById("searchinput").value.trim();
  if(input !==""){
     fetchRecipes(input);
  }
}
dishBtn.forEach(btn =>{
  btn.addEventListener("click",()=>{
    fetchRecipes(btn.value);
  })
});

function viewRecipes(mealId){
const popupCard=document.getElementById('popupCard');
const recipeTitle=document.getElementById('recipeTitle');
const recipeDetails=document.getElementById('recipeDetails');
const ingredientsList=document.getElementById('ingredientsList');

ingredientsList.innerHTML="";

fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
.then(res=>res.json())
.then(data =>{
  const meal = data.meals[0];

  recipeTitle.innerText=meal.strMeal;
  recipeDetails.innerText =meal.strInstructions;
  //recipeDetails.innerText=meal.strYoutube;

  for(let i=1;i<=20;i++){
    let ingredient=meal[`strIngredient${i}`];
    let measure =meal[`strMeasure${i}`];

    if (ingredient && ingredient.trim() !== "") {
                    let li = document.createElement("li");
                    li.innerText = `${measure ? measure :""} ${ingredient}`;
                    ingredientsList.appendChild(li);
                }
  }
  popupCard.style.display='block';
});

}
function closeRecipe(){
  document.getElementById('popupCard').style.display='none';
}
