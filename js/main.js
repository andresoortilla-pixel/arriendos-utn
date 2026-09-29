document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Datos detallados de cada propiedad
    const phone = "593990251911";
    const propertiesData = {
        'cuarto1': {
            title: 'Se arrienda Habitación Estándar cerca de UTN',
            price: '$80 / mes',
            specs: '<i class="fa-solid fa-bed"></i> 1 Habitación &nbsp;&nbsp; <i class="fa-solid fa-bath"></i> 1 Baño',
            description: 'Campus Base te presenta esta excelente habitación estándar, ideal para estudiantes. Cuenta con un espacio privado con baño propio y alacenas incluidas. Hay espacio suficiente para una cama y un escritorio. En el edificio cuentas con áreas compartidas como patio, terraza y lavandería. Adicionalmente, el valor mensual incluye luz, agua, internet y seguridad. (No es amoblada).',
            images: [
                'https://placehold.co/800x600/eeeeee/888888?text=Cuarto+Base+Foto+1',
                'https://placehold.co/800x600/dddddd/666666?text=Cuarto+Base+Foto+2',
                'https://placehold.co/800x600/cccccc/444444?text=Cuarto+Base+Foto+3'
            ],
            waMsg: 'Hola, me interesa mas información para la Habitación Estándar'
        },
        'cuarto2': {
            title: 'Se arrienda Habitación Plus muy iluminada',
            price: '$95 / mes',
            specs: '<i class="fa-solid fa-bed"></i> 1 Habitación Amplia &nbsp;&nbsp; <i class="fa-solid fa-bath"></i> 1 Baño',
            description: 'Hermosa habitación plus con mayor entrada de luz natural. Dispone de baño privado completo, alacenas más amplias para tu almacenamiento. El pago del arriendo ya cubre los servicios de luz, agua e internet de alta velocidad. Excelente ambiente estudiantil y seguro, a solo 12 minutos a pie de la universidad.',
            images: [
                'https://placehold.co/800x600/eeeeee/888888?text=Cuarto+Plus+Foto+1',
                'https://placehold.co/800x600/dddddd/666666?text=Cuarto+Plus+Foto+2',
                'https://placehold.co/800x600/cccccc/444444?text=Cuarto+Plus+Foto+3'
            ],
            waMsg: 'Hola, me interesa mas información para la Habitación Plus'
        },
        'dep1': {
            title: 'Se arrienda Minidepartamento Básico',
            price: '$105 / mes',
            specs: '<i class="fa-solid fa-house-chimney"></i> 2 Ambientes &nbsp;&nbsp; <i class="fa-solid fa-bath"></i> 1 Baño',
            description: 'Minidepartamento ideal para quienes buscan más independencia. Cuenta con dos ambientes distribuidos estratégicamente, un área con espacio para cocina y sus respectivas alacenas, y un dormitorio separado. Incluye baño privado, derecho a lavandería y áreas comunes. Servicios básicos incluidos.',
            images: [
                'https://placehold.co/800x600/eeeeee/888888?text=MiniDep+Basico+1',
                'https://placehold.co/800x600/dddddd/666666?text=MiniDep+Basico+2',
                'https://placehold.co/800x600/cccccc/444444?text=MiniDep+Basico+3'
            ],
            waMsg: 'Hola, me interesa mas información para el Minidepartamento Básico'
        },
        'dep2': {
            title: 'Se arrienda Minidepartamento Premium',
            price: '$120 / mes',
            specs: '<i class="fa-solid fa-house-chimney"></i> 2 Ambientes Amplios &nbsp;&nbsp; <i class="fa-solid fa-car"></i> Garaje Opcional',
            description: 'Nuestro espacio más exclusivo. Este minidepartamento premium ofrece ambientes amplios y totalmente separados. Baño privado de mayor tamaño, alacenas de gran capacidad, y la opción de solicitar garaje (sujeto a disponibilidad). Ideal para estudiantes que priorizan la comodidad o para compartir. Servicios incluidos en la cuota.',
            images: [
                'https://placehold.co/800x600/eeeeee/888888?text=MiniDep+Premium+1',
                'https://placehold.co/800x600/dddddd/666666?text=MiniDep+Premium+2',
                'https://placehold.co/800x600/cccccc/444444?text=MiniDep+Premium+3',
                'https://placehold.co/800x600/bbbbbb/333333?text=MiniDep+Premium+4'
            ],
            waMsg: 'Hola, quiero agendar una visita para el Minidepartamento Premium de $120'
        }
    };

    // 2. Elementos del DOM del Modal
    const modal = document.getElementById('room-modal');
    const closeBtn = document.querySelector('.close-btn');
    const modalTitle = document.getElementById('modal-title');
    const modalPrice = document.getElementById('modal-price');
    const modalSpecs = document.getElementById('modal-specs');
    const modalDescText = document.getElementById('modal-desc-text');
    const modalMainImg = document.getElementById('modal-main-image');
    const modalThumbnails = document.getElementById('modal-thumbnails');
    const modalWaBtn = document.getElementById('modal-whatsapp-btn');

    // 3. Abrir Modal al dar clic en "Ver más detalles"
    const viewButtons = document.querySelectorAll('.btn-ver-mas');
    
    viewButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const roomId = e.target.closest('button').getAttribute('data-id');
            const data = propertiesData[roomId];
            
            if(data) {
                // Llenar textos
                modalTitle.textContent = data.title;
                modalPrice.textContent = data.price;
                modalSpecs.innerHTML = data.specs;
                modalDescText.textContent = data.description;
                
                // Botón de WhatsApp
                const encodedMsg = encodeURIComponent(data.waMsg);
                modalWaBtn.href = `https://wa.me/${phone}?text=${encodedMsg}`;

                // Llenar Galería
                modalThumbnails.innerHTML = '';
                modalMainImg.src = data.images[0]; // Imagen principal por defecto
                
                data.images.forEach((imgSrc, index) => {
                    const imgEl = document.createElement('img');
                    imgEl.src = imgSrc;
                    if(index === 0) imgEl.classList.add('active'); // La primera activa
                    
                    // Evento para cambiar imagen principal
                    imgEl.addEventListener('click', function() {
                        // Cambiar la fuente de la imagen principal
                        modalMainImg.style.opacity = '0';
                        setTimeout(() => {
                            modalMainImg.src = this.src;
                            modalMainImg.style.opacity = '1';
                        }, 200);
                        
                        // Actualizar clase activa en miniaturas
                        document.querySelectorAll('.modal-thumbnails img').forEach(t => t.classList.remove('active'));
                        this.classList.add('active');
                    });
                    
                    modalThumbnails.appendChild(imgEl);
                });

                // Mostrar Modal
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden'; // Evitar scroll del fondo
            }
        });
    });

    // 4. Cerrar Modal
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restaurar scroll
    }

    closeBtn.addEventListener('click', closeModal);

    // Cerrar si se da click fuera del contenido (en el fondo oscuro)
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
});
