$(function () {

    var FIRST_ARTICLE = $("#inputFirst");
    
    var LAST_ARTICLE = $('#inputLast');
    
    var FIRST_LIST = $('#firstList');
    var LAST_LIST = $('#lastList')
    var FIRST_ARTICLE_TEXT = $('#first_article');
    var LAST_ARTICLE_TEXT = $('#last_article');

    var RELATED_LIST = $('#relatedList');
    var INPUT_RELATED = $('#inputRelated');
    var RELATED_BUTTON = $('#relatedButton');

    var FIRST_RANDOM = $('#firstRandom');
    var LAST_RANDOM = $('#lastRandom');
    var START_BUTTON = $("#startButton");

    var FIRST_RESUME = $('#first-resume');
    var LAST_RESUME = $('#last-resume');
    var RESUME_CONTENT = $("#resume-content");

    var SELECT_CONTENT = $('#select-content');
    var GAME_CONTENT = $('#game-content');


    selectedFirst = false;
    selectedLast = false;

    var firstList = [];
    var lastList = [];

    var currentRelated = [];
    var actualRelated = false;

    var started = false;

    var nodes_count = 0;



    async function fetchPokes() {
        $.ajax({
            url: 'https://candy-ultra-wednesday.glitch.me/',
            method: 'get',
            dataType: 'json',
            beforeSend: function () {
            },
            success: function (response) {
                console.log(response);
            }
        })
    }

    // fetchPokes();


    FIRST_ARTICLE.on('input', function () {
        search = encodeURI($(this).val());
        $.ajax({
            url: 'https://candy-ultra-wednesday.glitch.me/search?q=' + search,
            method: 'get',
            dataType: 'json',
            beforeSend: function () {
                FIRST_RANDOM.text('Carregando..');
                FIRST_RANDOM.addClass('bg-gradient-secondary');
                FIRST_RANDOM.removeClass('bg-gradient-warning');
            },
            success: function (response) {
                FIRST_RANDOM.text('Aleatório');
                FIRST_RANDOM.addClass('bg-gradient-warning');
                FIRST_RANDOM.removeClass('bg-gradient-secondary');
                console.log(response);
                FIRST_LIST.empty();

                firstList = response;
                response.forEach(option => {
                    FIRST_LIST.append(`<option value="${option.name}"></option>`)
                })

                // RESUME_CONTENT.show(200);
                // FIRST_ARTICLE.val(response.title);
                FIRST_RESUME.text('');
                // selectedFirst = response;
            },
            onerror: function (response) {
                FIRST_RANDOM.text('Aleatório');
                FIRST_RANDOM.addClass('bg-gradient-warning');
                FIRST_RANDOM.removeClass('bg-gradient-secondary');
            }
        })

    })

    LAST_ARTICLE.on('input', function () {
        search = encodeURI($(this).val());
        $.ajax({
            url: 'https://candy-ultra-wednesday.glitch.me/search?q=' + search,
            method: 'get',
            dataType: 'json',
            beforeSend: function () {
                LAST_RANDOM.text('Carregando..');
                LAST_RANDOM.addClass('bg-gradient-secondary');
                LAST_RANDOM.removeClass('bg-gradient-warning');
            },
            success: function (response) {
                LAST_RANDOM.text('Aleatório');
                LAST_RANDOM.addClass('bg-gradient-warning');
                LAST_RANDOM.removeClass('bg-gradient-secondary');
                console.log(response);
                LAST_LIST.empty();

                lastList = response;
                response.forEach(option => {
                    LAST_LIST.append(`<option value="${option.name}"></option>`)
                })

                // RESUME_CONTENT.show(200);
                // FIRST_ARTICLE.val(response.title);
                LAST_RESUME.text('');
                // selectedFirst = response;
            },
            onerror: function (response) {
                LAST_RANDOM.text('Aleatório');
                LAST_RANDOM.addClass('bg-gradient-warning');
                LAST_RANDOM.removeClass('bg-gradient-secondary');
            }
        })

    })


    FIRST_RANDOM.on('click', function () {
        $.ajax({
            url: 'https://candy-ultra-wednesday.glitch.me/random',
            method: 'get',
            dataType: 'json',
            beforeSend: function () {
                FIRST_RANDOM.text('Carregando..');
                FIRST_RANDOM.addClass('bg-gradient-secondary');
                FIRST_RANDOM.removeClass('bg-gradient-warning');

            },
            success: function (response) {
                FIRST_RANDOM.text('Aleatório');
                FIRST_RANDOM.addClass('bg-gradient-warning');
                FIRST_RANDOM.removeClass('bg-gradient-secondary');
                RESUME_CONTENT.show(200);
                FIRST_ARTICLE.val(response.title);
                var resume = response.resume.substring(0, 300) + "....";
                FIRST_RESUME.text(resume);
                selectedFirst = response;
                firstList = [];
            }
        })
    })

    LAST_RANDOM.on('click', function () {
        $.ajax({
            url: 'https://candy-ultra-wednesday.glitch.me/random',
            method: 'get',
            dataType: 'json',
            beforeSend: function () {
                LAST_RANDOM.text('Carregando..');
                LAST_RANDOM.addClass('bg-gradient-secondary');
                LAST_RANDOM.removeClass('bg-gradient-warning');
            },
            success: function (response) {
                LAST_RANDOM.text('Aleatório');
                LAST_RANDOM.addClass('bg-gradient-warning');
                LAST_RANDOM.removeClass('bg-gradient-secondary');
                RESUME_CONTENT.show(200);
                LAST_ARTICLE.val(response.title);
                var resume = response.resume.substring(0, 300) + "....";
                LAST_RESUME.text(resume);
                selectedLast = response;
                lastList = [];

            }
        })
    })

    START_BUTTON.on('click', async function () {
        if (firstList.length > 0) {
            var input = FIRST_ARTICLE.val();
            selectedFirst = firstList.filter(element => {
                if (element.title == input) {
                    return element;
                }
            })
            selectedFirst = selectedFirst[0];
        }

        if (lastList.length > 0) {
            var input = LAST_ARTICLE.val();
            selectedLast = lastList.filter(element => {
                if (element.title == input) {
                    return element;
                }
            })
            selectedLast = selectedLast[0];
        }

        if (selectedLast && selectedFirst) {
            actualRelated = selectedFirst;
            await getRelated(selectedFirst.link);
            console.log(selectedFirst, selectedLast)
        } else {
            Swal.fire({
                title: `Necessário escolher os artigos`,
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }
    })

    async function getRelated(url) {

        url = url.replace('https://pt.wikipedia.org', '');
        $.ajax({
            url: 'https://candy-ultra-wednesday.glitch.me/related/?url=' + url,
            method: 'get',
            dataType: 'json',
            beforeSend: function () {
                START_BUTTON.text('Carregando..');
                START_BUTTON.addClass('bg-gradient-secondary');
                START_BUTTON.removeClass('bg-gradient-warning');
                $('#wiki').empty();
                $('#loading').show();
                $('#wiki').hide();
            },
            success: function (response) {
                START_BUTTON.text('Iniciar');
                START_BUTTON.addClass('bg-gradient-warning');
                START_BUTTON.removeClass('bg-gradient-secondary');
                if (typeof response.status !== 'undefined') {
                    Swal.fire({
                        title: `Não existe relacionamentos neste artigos, tente outro!`,
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    })
                } else {
                    $('#loading').hide();
                    $('#wiki').show();
                    console.log(response);
                    $('#wiki').html(response[response.length - 1].html);
                    cleanWiki();
                    SELECT_CONTENT.hide(300);
                    GAME_CONTENT.show(300);
                    FIRST_ARTICLE_TEXT.text(selectedFirst.title);
                    LAST_ARTICLE_TEXT.text(selectedLast.title);
                    currentRelated = response;
                    RELATED_LIST.empty();
                    response = response.sort(function (a, b) {
                        if (a.title > b.title) {
                            return 1;
                        }
                        if (a.title < b.title) {
                            return -1;
                        }
                        return 0;
                    });

                    var hasItem = [];
                    response.forEach(element => {
                        if (element.title == selectedLast.title) {
                            cy.add([
                                { group: 'edges', data: { id: selectedLast.title + '-node', source: selectedLast.title, target: actualRelated.title } }
                            ]);
                            winGame();
                        }
                        if (!hasItem.includes(element.title)) {
                            RELATED_LIST.append(`<option value="${element.title}"></option>`)
                            hasItem.push(element.title);
                        }
                    });

                    if (!started) {
                        setNodes();
                    }


                }

            }
        })

    }

    function cleanWiki() {
        $('.mw-editsection').remove();
        $('.reference').remove();
        $('#wiki').find('img').remove();
        $('#p-lang-btn').remove();
        $('.vector-article-toolbar').remove();
        $('#siteNotice').remove();
        $('#vector-toc-collapsed-button').remove();
    }

    $(document).on('click', 'a', async function (element) {
        element.preventDefault();
        await guess($(this).text());
    });

    RELATED_BUTTON.on('click', async function () {
        var input = INPUT_RELATED.val();

        await guess(input);
        console.log(currentRelated);


        INPUT_RELATED.val('');
    })

    async function guess(input) {
        related = currentRelated.filter(element => {
            if (element.title == input) {
                return element;
            }
        })

        if (related.length > 0) {

            console.log(actualRelated);
            console.log(selectedFirst);
            console.log(related[0]);

            if (actualRelated.title != selectedFirst.title) {
                cy.nodes(`[id = "${actualRelated.title}"]`).style('background-color', '');
            }

            cy.add([
                { group: 'nodes', data: { id: related[0].title } },
                { group: 'edges', data: { id: related[0].title + '-node', source: related[0].title, target: actualRelated.title } }
            ]);

            await getRelated(related[0].link);

            actualRelated = related[0];

            cy.nodes(`[id = "${actualRelated.title}"]`).style('background-color', '#ff7600');
            cy.fit();

            nodes_count++;

            var layout = cy.elements().layout({
                name: 'random',
                avoidOverlap: true,
                fit: true, // whether to fit to viewport
                padding: 30, // fit padding
                boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
                animate: false, // whether to transition the node positions
                animationDuration: 500, // duration of animation in ms if enabled
                animationEasing: undefined, // easing of animation if enabled
                animateFilter: function (node, i) { return true; }, // a function that determines whether the node should be animated.  All nodes animated by default on animate enabled.  Non-animated nodes are positioned immediately when the layout starts
                ready: undefined, // callback on layoutready
                stop: undefined, // callback on layoutstop
                transform: function (node, position) { return position; } // transform a given node position. Useful for changing flow direction in discrete layouts 
            });

            layout.run();

            // if (cy.getElementById(selectedLast.title + '-node').isEdge()) {
            //     console.log(selectedLast.title);
            //     winGame()
            // }
            currentRelated.filter(element => {
                console.log(element.title)
                console.log(selectedLast.title);

            })

            if (!cy.getElementById(related[0].title).isNode()) {


            } else {

            }

        } else {
            Swal.fire({
                title: `Não existe relacionamento entre essas duas coisas`,
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }


        // currentRelated.filter(element => {
        //     if (element.title == selectedLast.title) {
        //         cy.add([
        //             { group: 'edges', data: { id: selectedLast.title + '-node', source: selectedLast.title, target: actualRelated.title } }
        //         ]);
        //         winGame();
        //     }
        // })
    }

    function winGame() {
        INPUT_RELATED.hide();
        RELATED_BUTTON.hide();
        $('.victory').html(`<p>Parabéns</p>Você utilizou apenas ${nodes_count} artigos para relacionar 
        <span style="color: #26977f;font-weight: 900;" class="text-bold">${selectedFirst.title}</span> a <span
        style="color:#221761;font-weight: 900;"
        >${selectedLast.title}</span>`);
        $('#payDev').show();
    }

    function setNodes() {
        cy = cytoscape({
            container: document.getElementById('cy'),
            style: [
                {
                    selector: 'node',
                    css: {
                        width: 20,
                        height: 20,
                        'background-color': '#61bffc',
                        content: 'data(id)'
                    }
                }
            ],
            elements: {
                nodes: [
                    { data: { id: selectedFirst.title }, position: { x: 100, y: 100 } },
                    { data: { id: selectedLast.title }, position: { x: 105, y: 109 } },
                ],
                edges: [
                ]
            },
            layout: {
                name: 'breadthfirst',
                directed: false,
                padding: 3,
                /* color: "#ffff00",*/
                fit: false,
                avoidOverlap: true,
            }
        });
        started = true;

        cy.nodes(`[id = "${selectedFirst.title}"]`).style('background-color', '#26977f');
        cy.nodes(`[id = "${selectedLast.title}"]`).style('background-color', '#221761');



    }

    $('#newGame').on('click', function () {
        window.location.reload();
    })

})
