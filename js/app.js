

new Vue({
    el:"#app",
    data:{
        url: "http://127.0.0.1:8000/api/books",
        books: [],
        title: '',
        text: '',
        authorid: 0,
        editFound: false,
        updateId:0,
        
    },
    methods: {
        getBook(){
            axios.get(this.url).then(response =>{
                this.books = response.data.data;
            });
        },

        addBook(){
            let newBook = {
                author_id: parseInt(this.authorid),
                title: this.title,
                body: this.text,
            }
            console.log(newBook);

            axios.post(this.url, newBook).then(response=>{
                this.books = response.data.data;
            })
        },

        updateAction(book){
            this.editFound = true;

            this.updateId = book.id;
            this.authorid = book.author_id;
            this.title = book.title;
            this.text = book.body;
        },
        
        updateBook(){
            
            let updateInfo = {
                author_id: parseInt(this.authorid),
                title: this.title,
                body: this.text,
            }
            axios.put(this.url +'/'+ this.updateId,updateInfo).then(response=>{
                this.books = response.data.data;
            })

            this.editFound = false;

        
            this.authorid = 0;
            this.title = '';
            this.text = '';

        },

        deleteBook(book){
            let deletetId = book.id;
            axios.delete(this.url +'/'+ deletetId).then(response=>{
                this.books = response.data.data;
            })
        }

    },
    mounted() {
       this.getBook();
       this.addBook();
    },
})