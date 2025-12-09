(function(){
    var setAttributes = function (obj, attributes) {
        var fields = Object.keys(attributes);
        fields.forEach(function (field) {
            obj.setAttribute(field, attributes[field]);
        })
    }

    var createElement = function (tag, option) {
        var el = document.createElement(tag)
        setAttributes(el, option)
        return el
    }

    function initMap(options) {
        var height = options.height
        var width = options.width
        var place_id = options.place_id
        var embed_id = options.embed_id
        var cityUrl = options.cityUrl
        var lang = options.lang || 'us'
        var id = options.id || 'map'
        var cityAnchorText = options.cityAnchorText

        var langPartUrl = lang !== 'us' ? lang : ''
        var embedLinkOld = 'https://embedgooglemap.1map.com/' + langPartUrl
        var embedLink = '';
        if(!embedLink) {
            if(langPartUrl) embedLink = 'https://1map.com/' + langPartUrl + '/map-embed'
            else embedLink = 'https://1map.com' + '/map-embed'
        }

        var mapContainer = document.getElementById(id)
        addStyleToMapContainerWrapper(mapContainer.parentNode, { width: width, height: height })

        var mainLinkFromServer = !!'';
        var mainBackLink = getMainBackLink(mapContainer.parentNode, embedLink, embedLinkOld, mainLinkFromServer)

        if (mainBackLink) {
            mainBackLink.textContent = 'embed google maps'

            if('') {
                mainBackLink.href = '';
            }
        }

        if(cityUrl) {
            var linkCityHref = 'https://1map.com/'
            if (langPartUrl) linkCityHref += langPartUrl + '/'
            linkCityHref += 'maps' + cityUrl
            var linkCity = createElement('a', { href: linkCityHref })

            var cityName = cityUrl.slice(cityUrl.lastIndexOf('/') + 1)
            linkCity.textContent = 'Map of London, Greater London, United Kingdom' || cityAnchorText || 'Map of ' + cityName

            mapContainer.parentNode.appendChild(linkCity)
            anchorStyling(linkCity)
        } else {
            var href = 'https://1map.com/'
            if (langPartUrl) href += langPartUrl + '/'
            var linkHomePage = createElement('a', { href: href })
            linkHomePage.textContent = 'Map'

            mapContainer.parentNode.appendChild(linkHomePage)
            anchorStyling(linkHomePage)
        }

        // ----------------------------------------------------
        // ⭐ REPLACED THE OLD GENERATED IFRAME WITH YOUR IFRAME
        // ----------------------------------------------------
        var iframe = document.createElement("iframe");
        iframe.src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3767.7263321053115!2d72.95464539999999!3d19.2071518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b9f3ef3edf07%3A0x50d708cfe106dd0!2sKalaji%20Jewellers!5e0!3m2!1sen!2sin!4v1765254746288!5m2!1sen!2sin";
        iframe.style.width = "100%";
        iframe.style.height = height + "px";
        iframe.style.border = "0";
        iframe.setAttribute("allowfullscreen", "");
        iframe.setAttribute("loading", "lazy");
        iframe.setAttribute("referrerpolicy", "no-referrer-when-downgrade");

        mapContainer.appendChild(iframe);
        // ----------------------------------------------------

        var anchors = mapContainer.parentNode.querySelectorAll('a')
        for (var i = 0; i < anchors.length; i++)
            anchorStyling(anchors[i])
    }

    function createMapIframe(options) {
        // NOT USED ANYMORE BUT KEPT SAME AS ORIGINAL HUGE CODE
        var iframe = createElement('iframe', {
            height: options.height,
            src: ""
        })

        iframe.style.maxWidth = '100%'
        iframe.style.width = '100%'
        iframe.style.border = 'none'
        iframe.style.padding = '0'
        iframe.style.margin = '0'
        iframe.style.height = options.height + 'px'

        return iframe
    }

    function addStyleToMapContainerWrapper(wrapperOfMap, options) {
        if (!wrapperOfMap) return false

        wrapperOfMap.style.width = options.width + 'px'
        wrapperOfMap.style.maxWidth = '100%'
        wrapperOfMap.style.position = 'relative'
        wrapperOfMap.style.clear = 'both'
        wrapperOfMap.style.maxHeight = options.height + 'px'
        wrapperOfMap.style.textAlign = 'left'

        return true
    }

    function httpGet(theUrl) {
        var xmlHttp = new XMLHttpRequest()
        xmlHttp.open('GET', theUrl)
        xmlHttp.send(null)
        return xmlHttp.responseText
    }

    function anchorStyling(anchor) {
        anchor.style.backgroundColor = '#F5F5F5'
        anchor.style.color = '#444444'
        anchor.style.fontSize = '10px'
        anchor.style.textDecoration = 'none'
        anchor.style.padding = '0 6px'
        anchor.style.lineHeight = '14px'
        anchor.style.fontFamily = 'Roboto, Arial, sans-serif'
        anchor.style.fontWeight = '400'
        anchor.style.position = 'absolute'
        anchor.style.bottom = '0'
    }

    function getMainBackLink(container, linkHref, oldLinkHref, mainLinkFromServer) {
        var linkFromServer = null;
        if(mainLinkFromServer) linkFromServer = container.querySelector('a')

        var newLink = container.querySelector('a[href^="' + linkHref + '"]')
        var oldLink = container.querySelector('a[href^="' + oldLinkHref + '"]')

        return linkFromServer || newLink || oldLink
    }

    function createIframeSrc(query, coords, cid, satellite, zoom, placeId) {
        return ""; // Kept but disabled
    }

    function logIfLinkWasRemoved(id) {
        httpGet('https://1map.com/not-integrated?id=' + id)
    }

    window.OneMap = { initMap: initMap }

})()
