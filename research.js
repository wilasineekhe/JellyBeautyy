function filterArticles() {
    let input = document.getElementById('searchInput').value.toUpperCase();
    let articles = document.getElementsByClassName('article');
    
    for (let i = 0; i < articles.length; i++) {
        let title = articles[i].getElementsByClassName('article-title')[0];
        let articleTitle = title.innerText.toUpperCase();
        
        // Show articles that either start with the input or contain the input as a substring
        if (articleTitle.startsWith(input) || articleTitle.includes(input)) {
            articles[i].style.display = "";
        } else {
            articles[i].style.display = "none";
        }
    }
}
