console.log('Vue OK', Vue);

/* 
Partendo dal markup della versione svolta in js plain, rifare lo slider ma questa volta usando Vue.
Vi ricordo le funzionalità minime
Deve vedersi un'immagine grande che è l'immagine principale
Devono vedersi i thumbnails
Il thumbnails che corrisponde all'immagine grande deve essere graficamente messo in risalto con una classe active
Deve essere possibile cambiare l'immagine principale con le freccette prev e next
Bisogna fare in modo che il carosello sia "infinito": se clicco sul next e sono all'ultima immagine, ricomincio dalla prima; se sono alla prima immagine e clicco sul prev vado all'ultima.
Bonus:
1- al click su una thumb, visualizzare in grande l'immagine corrispondente
2- applicare l'autoplay allo slider: ogni 3 secondi, cambia immagine automaticamente
3- quando il mouse va in hover sullo slider, bloccare l'autoplay e farlo riprendere quando esce
*/

const app = Vue.createApp({
    name: 'Carousel',
    data(){
        return {
            currentIndex: 0,
            pictures: source,
            autoplay: null
        }
    },
    methods: {
        changeImage(target) {
            if(target === 'next'){
                // Incremento l'indice
                this.currentIndex++;
                // Controllo per ripartire dall'inizio
                if(this.currentIndex === source.length){
                this.currentIndex = 0;
                }
            } else if (target === 'prev') {
                // Decremento l'indice
                this.currentIndex--;
                // Controllo per ripartire dalla fine
                if(this.currentIndex < 0){
                    this.currentIndex = source.length - 1;
                }
            } else {
                // Metto il current index sul thumb corrente
                this.currentIndex = target;
            }
        },

        startAutoplay(){
            this.autoplay = setInterval(()=>{
                // Incremento l'indice
                this.currentIndex++;
                // Controllo per ripartire dall'inizio
                if(this.currentIndex === source.length){
                this.currentIndex = 0;
                }
            }, 3000);
        },

        stopAutoplay(){
            clearInterval(this.autoplay);
        }
    },
    
    mounted(){
        this.startAutoplay();
    }
});

app.mount('#root');