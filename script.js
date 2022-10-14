var app = new Vue({
    el: '#app',

    data: {
        thumbnail: "https://media.discordapp.net/attachments/776979897763627029/1029075061803589682/Rectangle.png",
        infos: [],
        date: '',
        timer: "00:00",
        selecione: "Selecione um podcast <br> para ouvir",

        simbols: ["assets/play-previous.svg", "assets/play-next.svg"],
        play: "assets/Play-button.png",
        pause: "assets/Union.png",
        isPlaying: false,
        verifica: true,
        selecionado: false,

        namepodcast: "",
        memberpodcast: "",
        audio: "",
        thumb: "",
        datapodcast: "",
        currentDuration: "00:00",
        durationpodcast: "00:00",
        desscriptionpodcast: "",
        escutando: false,
        player: new Audio(),

        total: 0,


        indexElement: 0,

        myStyle: {
            backgroundColor: "#9164FA",
        },
        border: { border: '1px solid green' },
        image: { backgroundImage: "", border: '3px dashed #b4a1df' },
        BarraStyle: { width: '' },
        barratamanho: "",



    },
    mounted() {
        axios.get("https://raw.githubusercontent.com/codificar/podcastvalley/main/podcastvalley_data.json").then(response => (this.infos = response.data.episodes))
        this.date = this.printDate();

        this.total = 10

    },
    methods: {
        printDate: function () {
            return new Date().toLocaleDateString();
        },
        playPodcast: function () {
            if (this.selecionado) {
                this.player.src = this.audio
                this.player.play()
                this.isPlaying = true

            }

        },
        pausePodcast: function () {
            this.player.pause()
            this.isPlaying = false
        },
        convertSecondstoTime: function (param) {
            given_seconds = param;

            hours = Math.floor(given_seconds / 3600);
            minutes = Math.floor((given_seconds - (hours * 3600)) / 60);
            seconds = given_seconds - (hours * 3600) - (minutes * 60);

            timeString = hours.toString().padStart(2, '0') + ':' +
                minutes.toString().padStart(2, '0') + ':' +
                seconds.toString().padStart(2, '0');

            return timeString
        },
        convertssecondstoMinuts: function (time) {
            const minutes = Math.floor(time / 60);
            const seconds = Math.floor(time - minutes * 60)
            return `${('0' + minutes).slice(-2)}:${('0' + seconds).slice(-2)}` 
        },
        previPodcast: function () {
            this.indexElement--
            if (this.indexElement == -1) {
                this.indexElement = 0
            } else {
                this.audio = this.infos[this.indexElement].file.url
                this.namepodcast = this.infos[this.indexElement].title
                this.memberpodcast = this.infos[this.indexElement].members
                this.thumb = this.infos[this.indexElement].thumbnail

                var datapod = this.infos[this.indexElement].published_at
                var datasemhr = datapod.split(' ');
                var datacomtraco = datasemhr[0].split('-')
                var datafinal = datacomtraco[2] + "/" + datacomtraco[1] + "/" + datacomtraco[0]
                this.datapodcast = datafinal
                var duracao = this.infos[this.indexElement].file.duration
                var duracaoform = this.convertSecondstoTime(duracao)
                this.durationpodcast = duracaoform
                this.desscriptionpodcast = this.infos[this.indexElement].description
                this.player.src = this.audio
                this.player.play()
                this.isPlaying = true
            }

        },
        convert: function(data) {
            console.log('oi')
        },
        nextPodcast: function () {
            this.indexElement++
            if(this.indexElement > this.infos.length){
                this.indexElement = this.infos.length
            } else{
                this.audio = this.infos[this.indexElement].file.url
                this.namepodcast = this.infos[this.indexElement].title
                this.memberpodcast = this.infos[this.indexElement].members
                this.thumb = this.infos[this.indexElement].thumbnail
    
                var datapod = this.infos[this.indexElement].published_at
                var datasemhr = datapod.split(' ');
                var datacomtraco = datasemhr[0].split('-')
                var datafinal = datacomtraco[2] + "/" + datacomtraco[1] + "/" + datacomtraco[0]
                this.datapodcast = datafinal
                var duracao = this.infos[this.indexElement].file.duration
                var duracaoform = this.convertSecondstoTime(duracao)
                this.durationpodcast = duracaoform
                this.desscriptionpodcast = this.infos[this.indexElement].description
                this.player.src = this.audio
                this.player.play()
                this.isPlaying = true
            }
            
        },
        selecionaPodcast: function (param) {
            var ident = param
            this.selecionado = true
            for (i = 0; i < this.infos.length; i++) {
                if (this.infos[i].id == ident) {
                    this.indexElement = i
                }
            }

            this.image = { backgroundImage: "url(https://i.scdn.co/image/51d62ddf26c8e15ce7e8789419da664dd89f21a4)", border: "3px solid #b4a1df" }
            this.selecione = ""
            this.namepodcast = this.infos[this.indexElement].title
            this.memberpodcast = this.infos[this.indexElement].members
            this.thumb = this.infos[this.indexElement].thumbnail

            var datapod = this.infos[this.indexElement].published_at
            var datasemhr = datapod.split(' ');
            var datacomtraco = datasemhr[0].split('-')
            var datafinal = datacomtraco[2] + "/" + datacomtraco[1] + "/" + datacomtraco[0]
            console.log(datafinal)
            this.datapodcast = datafinal
            var duracao = this.infos[this.indexElement].file.duration
            var duracaoform = this.convertSecondstoTime(duracao)
            this.durationpodcast = duracaoform
            this.audio = this.infos[this.indexElement].file.url
            this.desscriptionpodcast = this.infos[this.indexElement].description
            this.selecionado = true

            if (!this.isPlaying) {
                this.player.src = this.audio
                this.player.play()
                this.isPlaying = true

                this.barratamanho = document.querySelector('#barprogress')
                this.barratamanho.max = this.durationpodcasts
                // this.player.ontimeupdate = this.timeUpdate()
                this.player.ontimeupdate = () => {
                    this.barratamanho.max = this.durationpodcasts
                    this.currentDuration = this.convertssecondstoMinuts(this.player.currentTime)
                    this.barratamanho.value = this.player.currentTime
                }

            }


        },
        voltar: function () {
            document.location.reload(true);
        }


    }
});