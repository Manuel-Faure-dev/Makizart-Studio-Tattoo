linkElements = $('.slides a') // premier carrousel
linkElementsA = $('.galery-slides-div a') // second carrousel
const carrouselContainer = $('.carousel-container')
const carrouselContent = $('.carousel-content')

carrouselContent.hide()
carrouselContainer.hide()

function carousselImg(linkImg, section, div) {
    for (const link of linkImg) {
        $(link).on('click', function (e) {
            e.preventDefault()

            // Afficher le carrousel
            section.show()
            div.show()
            section.addClass('active')

            // Sélectionner l'élément <img> à l'intérieur de l'élément <a>
            imgSrc = $(this).find('img')

            // Ajouter une classe à l'élément <img>
            imgSrc.addClass('link-img')

            // Copier l'élément <img> pour l'ajouter au carrousel
            const clonedImg = imgSrc.clone()

            // Ajouter l'image clonée au conteneur de carrousel
            div.empty().append(clonedImg)

            let currentIndex = 0

            // Gestionnaire d'événement clic pour le bouton suivant
            $('.nextBtn').on('click', function () {
                currentIndex++
                if (currentIndex >= linkImg.length) {
                    currentIndex = 0
                }
                const nextImgSrc = $(linkImg[currentIndex])
                    .find('img')
                    .attr('src')
                div.empty().append(`<img src="${nextImgSrc}" class="link-img">`)
            })

            // Gestionnaire d'événement clic pour le bouton précédent
            $('.prevBtn').on('click', function () {
                currentIndex--
                if (currentIndex < 0) {
                    currentIndex = linkImg.length - 1
                }
                const prevImgSrc = $(linkImg[currentIndex])
                    .find('img')
                    .attr('src')
                div.empty().append(`<img src="${prevImgSrc}" class="link-img">`)
            })

            // Cache le caroussel si on click à l'extérieur de l'image affichée
            document.addEventListener('click', function (event) {
                const isInsideCarousel =
                    event.target.closest('#carouselContainer')
                const isInsideImageLink = event.target.closest('.link-img')
                const isInsideButton =
                    event.target.closest('.nextBtn, .prevBtn')

                if (
                    !isInsideCarousel &&
                    !isInsideImageLink &&
                    !isInsideButton
                ) {
                    carrouselContainer.hide()
                    carrouselContent.hide()
                    imgSrc.removeClass('link-img')
                }
            })
        })
    }
}

carousselImg(linkElements, carrouselContainer, carrouselContent)
carousselImg(linkElementsA, carrouselContainer, carrouselContent)
