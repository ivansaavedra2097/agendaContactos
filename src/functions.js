const nombre = document.getElementById('nombre');
const numero = document.getElementById('numero');
const correo = document.getElementById('correo');
const btnAgregar = document.getElementById('btn-agregar');
const btnBorrar = document.getElementsByClassName('borrar-contacto');
const btnCancelar = document.getElementsByClassName('cancelar-cambios');
const btnEditarDatos = document.getElementsByClassName('editar-contacto');
const btnEditar = document.getElementsByClassName('eviar-cambios');
const btnToogle = document.getElementById('btn-toogle');
const form = document.getElementsByClassName('div-agregar');

btnToogle.addEventListener('click', () => {
    if(form[0].classList.contains('visible')) {
        form[0].classList.remove('visible');
    } else {
        form[0].classList.add('visible');
    }
});

btnAgregar.addEventListener('click', () => {
    window.location.href = `agregar/${nombre.value}/${numero.value}/${correo.value}`;
});

for(const btn of btnBorrar ) {
    btn.addEventListener('click', () => {
        window.location.href = `borrar/${btn.id}`;
    });
}

const changeInputDisabled = (id) => {
    const inputs = document.getElementsByClassName(`form-${id}`);
    for(const input of inputs) {
        if(input.disabled) {
            input.disabled = false;
        } else {
            input.disabled = true;
        }
    }
}

const changeIconsEdit = (id) => {
    const icons = document.getElementsByClassName(`i-${id}`);
    for(const icon of icons) {
        if(icon.classList.contains('icon-hidden')) {
            icon.classList.remove('icon-hidden');
        }else {
            icon.classList.add('icon-hidden');
        }
    }
}

const guardarDatosLocal = (contacto) => {
    const local = localStorage;
    const existe = local.getItem('contacto');
    const contacto_str = JSON.stringify(contacto);
    if(!existe) {
        local.setItem('contacto', contacto_str);
    } else {
        local.removeItem('contacto');
        local.setItem('contacto', contacto_str);
    }
}

const traerDatosLocal = () => {
    const local = localStorage;
    const existe = local.getItem('contacto');

    if(!existe) {
        return console.error('Error al obtener los datos de localStorage');
    } else {
        const contacto = JSON.parse(local.getItem('contacto'));
        return contacto;
    }
}

const respaldarDatos = (id) => {
    const inputs = document.getElementsByClassName(`form-${id}`);
    const contacto = {
        nombre: inputs[0].value,
        numero: inputs[1].value,
        correo: inputs[2].value,
    }
    return contacto;
}

const traerRespuestas = (id) => {
    const inputs = document.getElementsByClassName(`form-${id}`);
    const contacto = {
        nombre:inputs[0].value,
        numero:inputs[1].value,
        correo:inputs[2].value,
    }
    return contacto;
}

// const cancelarRespuestas = (id) => {
//     const contacto = traerRespuestas(id);
//     console.log(contacto);
// }

for(const btn of btnEditarDatos ) {
    btn.addEventListener('click', () => {
        const id = btn.id;
        const contacto = respaldarDatos(id);
        guardarDatosLocal(contacto);
        changeInputDisabled(id);
        changeIconsEdit(id);
    });
}

for(const btn of btnEditar) {
    btn.addEventListener('click', () => {
        const id = btn.id;
        const contacto = traerRespuestas(id);
        console.log(contacto);
        changeInputDisabled(id);
        changeIconsEdit(id);
        window.location.href = `editar/${id}/${contacto.nombre}/${contacto.numero}/${contacto.correo}`;
    })
}

for(const btn of btnCancelar) {
    btn.addEventListener('click', () => {
        const id = btn.id;
        const contacto = traerDatosLocal();
        const inputs = document.getElementsByClassName(`form-${id}`);
        inputs[0].value = contacto.nombre;
        inputs[1].value = contacto.numero;
        inputs[2].value = contacto.correo;
        changeInputDisabled(id);
        changeIconsEdit(id);
    });
}





