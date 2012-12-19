;
(function ($, window, document, undefined) {
    $.fn.twitread = function (options) {
        var base = this;

        var defaults = {
            target: $(this),
            source: $(this).attr('rel'),
            template: '.flusso_twitter', //la classe del template caricato
            type: 'status', //status per la lista complete,latest per l'ultimo
            img: false, //true per mostrare una immagine personalizzata accanto al tweet
            limit: null, //il limite dei tweet visualizzati
            items_in_page: null, //indica il numero dei tweet per pagina in caso di paginazione
            entities: true, //attiva o disattiva i link nei tweet
            media: {
                show: false, //mostra immagini
                embed: false, // le inserisce di base nel corpo del tweet
                text: null // testo da mostrare al posto della foto per un eventuale link
            },
            fade: false, //per attivare o disattivare il fade
            click_target: null,
            refresh: null, //abilita il refresh
            clock: false, //mostra ora
            since: null, //mostra solo da un delimitato id
            callbackFnk: function () {
                return false;
            }
        };


        var index = 1,
            content_loaded = 0,
            options = $.extend(defaults, options),
            /*template = $(options.template).outerHTML(),*/
            template = $(options.template).clone().wrap('<p>').parent().html(),
            template_height;

        var monthNames = [
            ["Jan", "Gen"],
            ["May", "Mag"],
            ["Jun", "Giu"],
            ["Jul", "Lug"],
            ["Aug", "Ago"],
            ["Sep", "Set"],
            ["Oct", "Ott"],
            ["Dec", "Dic"]
        ];


        function refresh() {
            var duration = options.refresh;
            var tmFunc = function () {
                    exec();
                };
            setTimeout(tmFunc, duration);

            function exec() {
                base.load(template, options);
                setTimeout(tmFunc, duration);
            }
        }
        base.load = function (template, options) {

            $(options.target).hide();
            $.ajax({
                url: options.source,
                type: 'GET',
                cache: false,
                dataType: 'json',
                success: function (data, textStatus, xhr) {

                    
                    //svuota il contenitore ogni volta che carica il json
                    (options.limit == null && options.type == 'status' && content_loaded > 0) ? $(options.target).empty() : void(0);
                    //definisce il nodo principale dove cercare in base al tipo di flusso
                    (data.results != null) ? node = data.results : node = data;
                     template_height = parseInt($(options.template).height());
                    $.each(node, function (i) {
                        //se il type è status ma c'è un limite ai tweet letti non svuota il contenitore dei tweet ma riscrive quelli già presenti
                        (options.type == 'status') ? (options.limit != null) ? (content_loaded == 0) ? $(options.target).append(template) : void(0) : $(options.target).append(template) : void(0);

                        //qui legge i campi del json in base al tipo di flusso
                        index = i + 1;
                        var date = node[i].created_at.substring(4, 11),
                            date_split = node[i].created_at.split(" "),
                            hour,
                            mins,
                            time_split,
                            hour_split,
                            id_tweet = node[i].id,
                            media,
                            tweet = node[i].text;
                        (node[i].entities != null) ? media = node[i].entities.media : void(0);

                        if (data.results != null) {
                            var icon = node[i].profile_image_url,
                                user = node[i].from_user,
                                name = node[i].from_user_name;

                        } else {
                            var icon = node[i].user.profile_image_url,
                                user = node[i].user.screen_name,
                                name = node[i].user.name;
                            //formatta la data nel formato italiano nel caso il flusso sia una lista

                        }

                        
                           
                            for (var num = 0, len = date_split.length; num < len; num++) {
                                if (date_split[num].match(/(([0-9])|([0-1][0-9])|([2][0-3])):(([0-9])|([0-5][0-9]))/)) {
                                    time_split = date_split[num];
                                    hour_split = time_split.split(":"), hour = hour_split[0], mins = hour_split[1];
                                    if (hour_split[0].split("")[0].indexOf("0") > -1) {
                                        hour = hour_split[0].split("")[1]
                                    }
                                    hour = parseInt(hour);
                                    if (hour <= 22) {
                                        hour += 1
                                    }
                                   
                                }
                            }
                        
                        
                     $.each(monthNames, function (i, month) {
                            if (date.indexOf(month[0]) !== -1) {
                                date = date.replace(month[0], month[1]);
                                return false
                            }

                        });

                        //se img è false prende l'immagine di default del flusso altrimenti l'immagine va settata cone sfondo css
                        if (options.img == false) {
                            $(options.target).find(options.template).eq(i).find('.tweet-image').html('<img src="' + icon + '"/>');
                            $(options.target).find(options.template).eq(i).find('.flusso_content').addClass('default_img');
                            $(options.target).find(options.template).eq(i).addClass('nobg');
                        }

                        $(options.target).find(options.template).eq(i).find('.id_utente  a').attr('href', 'http://twitter.com/#!/@' + user).html('@' + user);
                        $(options.target).find(options.template).eq(i).find('.nome_utente').html(name);
                        $(options.target).find(options.template).eq(i).find('.nome_utente a').html(name);
                        $(options.target).find(options.template).eq(i).find('#logo  a').attr('href', 'http://twitter.com/#!/@' + user);
                        $(options.target).find(options.template).eq(i).find('.testo_utente p').html(tweet);


                        if (media != null) {
                            //se il tag media non è vuoto
                            var tweet_media;
                            $.each(media, function (a) {
                                tweet_media = $(this)[a].media_url_https;
    
                            });
                            if (options.media.show == true) {
                                //se si vuole mostrare le foto

                                if (options.media.embed == true && tweet_media !=null) {
                                    $(options.target).find(options.template).eq(i).find('.placeholder').html("<img src='" + tweet_media + "'/>");
                                    //scrive l'immagine direttamente
                                } else {
                                    if (options.media.text != null  && tweet_media !=null) {
                                        //se non si vuole mostrare l'immagine direttamente prende solo l'url in modo da poterla caricare al click o in un modal

                                        $(options.target).find(options.template).eq(i).find('.img_beacon').attr({
                                            rel: tweet_media,
                                            id: i
                                        }).html(options.media.text).css('display', 'block');
                                    }

                                }

                            } else {

                            }
                        }


                        if (options.clock == true) {
                            //mostra l'ora
                            $(options.target).find(options.template).eq(i).find('.time').html(date + " " + hour + ":" + mins)
                        } else {
                            $(options.target).find(options.template).eq(i).find('.time').html(date);
                        }
                        $(options.target).find(options.template).eq(i).find('#follow_bottom span.right  a').attr('href', 'http://twitter.com/#!/@' + user);
                        //rende i link clickabili
                        if (options.entities == true) {
                            var twit_split = $(options.target).find(options.template).eq(i).find('.testo_utente p').text().split(" ");

                            $.each(twit_split, function (key, value) {
                                if (value.indexOf('http:') > -1) {

                                    var text_replace = $(options.target).find(options.template).eq(i).find('.testo_utente p').html();

                                    var newstr = text_replace.replace(value, "<a href='" + value + "' target='_blank'>" + value + "</a>");
                                    $(options.target).find(options.template).eq(i).find('.testo_utente p').html(newstr);

                                }

                            });
                        }
                        //fa dei box dei twit dei link con un preciso link definito nelle opzioni

                        if (options.click_target != null) {
                            $(options.target).find(options.template).eq(i).hover(function () {
                                $(this).css('cursor', 'pointer');
                            }, function () {
                                $(this).css('cursor', 'auto');
                            });
                            $(options.target).find(options.template).eq(i).click(function () {
                                document.location.href = options.click_target;
                            });
                        }

                        //se è il type è status legge tutti i tweet presenti nel flusso a meno che non ci sia un limite,se il type è latest prende l'ultimo

                        if (options.type == 'latest') {
                            index = 1;
                            return (i == 0) ? false : true;
                        }
                        //interrompe il ciclo for se c'è un limite preciso in base all'id del tweet
                        if (options.since != null) {
                            return (id_tweet == options.since) ? false : true;
                        }
                        //interrompe il ciclo for se c'è un limite preciso in base al numero dei tweet
                        if (options.limit != null) {
                            return (i == options.limit - 1) ? false : true;
                        }
                       
                       

                    }); //end loop

                    base.show(options, index);

                },
                error: function (xhr, textStatus, errorThrown) {

                }
            });
                     


        }
        base.show = function (options, index) {

            $(options.target).find(options.template).show();
            (options.fade == true) ? $(options.target).fadeIn('slow').addClass('faded').css('display', 'block') : $(options.target).css('display', 'block')
            options.callbackFnk.call(this, options, index);
            content_loaded++;
            
        }

        base.load(template, options);

        //setta il refresh
        if (options.refresh != null) {

            refresh = new refresh();
        }


    }
})(jQuery, window, document);