export const projects = [
    {
        id: 1,
        title: "Tossa de Mar - Mont Blanc",
        category: "GRAN REPTE",
        year: "2024",
        stat: "938km",
        image: "/montblanc.png",
        description: "30 dies, 938 km i 1.381.950 passes. De la Costa Brava al sostre dels Alps.",
        fullContent: `
            <p class="lead text-xl font-light mb-8">Un viatge èpic des de la sorra del Mediterrani fins al cim més alt d'Europa occidental. 30 dies de superació, connexió amb la natura i solidaritat.</p>
            
            <h3 class="text-2xl font-bold mb-4 font-display uppercase">El Repte</h3>
            <p class="mb-6">Caminar des del nivell del mar (0m) fins als 4.809m del Mont Blanc és més que una fita física; és un símbol de com, pas a pas, podem assolir qualsevol cim que ens proposem. Aquesta travessa va unir dues de les nostres grans passions: el mar i la muntanya.</p>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 my-12 not-prose">
                <div class="bg-stone-50 p-6 border border-stone-200 text-center">
                    <span class="block text-4xl font-display font-bold text-alpine-600 mb-2">30</span>
                    <span class="text-sm uppercase tracking-widest text-stone-500 font-bold">Dies de travessa</span>
                </div>
                <div class="bg-stone-50 p-6 border border-stone-200 text-center">
                    <span class="block text-4xl font-display font-bold text-alpine-600 mb-2">938</span>
                    <span class="text-sm uppercase tracking-widest text-stone-500 font-bold">Kilòmetres</span>
                </div>
                <div class="bg-stone-50 p-6 border border-stone-200 text-center">
                    <span class="block text-4xl font-display font-bold text-alpine-600 mb-2">1.3M</span>
                    <span class="text-sm uppercase tracking-widest text-stone-500 font-bold">Passes</span>
                </div>
            </div>

            <h3 class="text-2xl font-bold mb-4 font-display uppercase">La Ruta</h3>
            <p class="mb-6">El camí va començar a la platja Gran de Tossa de Mar. Creuant les Gavarres, el Montseny, i endinsant-nos als Pirineus. Després, la llarga travessa pel sud de França fins a arribar als Alps. Cada etapa va ser una descoberta: nous paisatges, noves persones i nous reptes interns.</p>
            
            <p>Aquest projecte ha estat possible gràcies al suport de tots els col·laboradors i patrocinadors que han cregut en la causa de Sense Nord.</p>
        `
    },
    {
        id: 2,
        title: "Via Ferrata Solidària",
        category: "ESDEVENIMENT",
        year: "2024",
        stat: "1.600€",
        image: "/ferrata_real.jpg",
        description: "10 dies d'aventura solidària que van servir per ajudar una família afectada per un incendi.",
        fullContent: `
            <p class="lead text-xl font-light mb-8 text-stone-900">Una onada de solidaritat a la Costa Brava. Durant 10 dies, vam convertir l'esport en una eina d'ajuda directa.</p>
            
            <div class="bg-gradient-to-r from-emerald-50 to-teal-50 p-8 rounded-xl border border-emerald-100 shadow-sm my-10 text-center not-prose">
                <span class="block text-sm font-bold text-emerald-800 uppercase tracking-widest mb-2">Recaptació Total</span>
                <span class="block text-6xl md:text-7xl font-display font-bold text-emerald-600 mb-2">1.600€</span>
                <span class="inline-block bg-white px-4 py-1 rounded-full text-sm font-medium text-emerald-800 border border-emerald-100 shadow-sm">Objectiu Superat</span>
            </div>

            <h3 class="text-2xl font-bold mb-6 font-display uppercase text-alpine-900">La Causa</h3>
            <p class="mb-6">Aquesta iniciativa va néixer amb un propòsit urgent: <strong>ajudar una família que ho va perdre tot en un incendi</strong> a casa seva. La resposta de la comunitat va ser increïble.</p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 my-10 not-prose">
                <div class="bg-stone-50 p-8 rounded-lg border-l-4 border-alpine-500">
                    <span class="block text-4xl mb-4 font-bold text-alpine-300">10</span>
                    <h4 class="text-lg font-bold text-alpine-900 uppercase mb-2">Dies d'Activitat</h4>
                    <p class="text-stone-600">Jornades ininterrompudes de guiatge a la Via Ferrata de Sant Feliu de Guíxols.</p>
                </div>
                <div class="bg-stone-50 p-8 rounded-lg border-l-4 border-alpine-500">
                    <span class="block text-4xl mb-4 font-bold text-alpine-300">∞</span>
                    <h4 class="text-lg font-bold text-alpine-900 uppercase mb-2">Agraïment Etern</h4>
                    <p class="text-stone-600">Gràcies a tots els participants i col·laboradors (Oceanomads, Can GOL, Hotel Windsor) per fer-ho possible.</p>
                </div>
            </div>

            <p class="mb-6">Va ser molt més que esport; va ser una demostració de com la muntanya uneix persones per fer front a les adversitats.</p>
        `
    },
    {
        id: 3,
        title: "Escalada al Senegal",
        category: "COOPERACIÓ",
        year: "2024",
        stat: "Equipament",
        image: "/senegal_real.jpg",
        description: "Viatge solidari al Senegal per equipar vies d'escalada i col·laborar amb una escola local.",
        fullContent: `
             <p class="lead text-xl font-light mb-8 text-stone-900">Unint l'escalada i la cooperació internacional. Portant la passió per la roca més enllà de les nostres fronteres.</p>
             
             <h3 class="text-2xl font-bold mb-4 font-display uppercase text-alpine-900 border-b border-stone-200 pb-2">Missió: Senegal</h3>
             <p class="mb-6">Aquest projecte neix de la voluntat de compartir. Viatgem al Senegal amb un objectiu doble que uneix esport i educació:</p>
             
             <div class="grid grid-cols-1 md:grid-cols-2 gap-8 my-10 not-prose">
                <div class="relative group overflow-hidden bg-stone-900 rounded-lg h-64">
                    <img src="/senegal_card_sport.jpg" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Escalada al Senegal" />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10"></div>
                    <div class="absolute inset-0 bg-alpine-600/20 group-hover:bg-alpine-600/30 transition-colors z-10"></div>
                    <div class="absolute bottom-0 left-0 p-8 z-20 text-white">
                        <span class="block text-xs font-bold uppercase tracking-widest text-alpine-300 mb-2">Esport</span>
                        <span class="block text-3xl font-display font-bold mb-2">Equipar Vies</span>
                        <p class="text-sm text-stone-200 leading-relaxed">Creació d'una escola d'escalada segura i accessible per a tothom.</p>
                    </div>
                </div>
                <div class="relative group overflow-hidden bg-stone-900 rounded-lg h-64">
                    <img src="/senegal_card_edu.jpg" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Educació i suport" />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10"></div>
                    <div class="absolute inset-0 bg-orange-600/20 group-hover:bg-orange-600/30 transition-colors z-10"></div>
                    <div class="absolute bottom-0 left-0 p-8 z-20 text-white">
                         <span class="block text-xs font-bold uppercase tracking-widest text-orange-300 mb-2">Educació</span>
                        <span class="block text-3xl font-display font-bold mb-2">Suport Escolar</span>
                        <p class="text-sm text-stone-200 leading-relaxed">Rehabilitació i material per a l'escola local de la comunitat.</p>
                    </div>
                </div>
             </div>

             <h3 class="text-xl font-bold mb-4 font-display uppercase text-alpine-900">Com Finançar-ho?</h3>
             <p class="mb-6">Per fer realitat aquest somni, hem dissenyat unes <strong>samarretes solidàries</strong>. El 100% dels beneficis es destinen íntegrament a la compra de parabolts, material escolar i logística del viatge.</p>
        `
    },
    {
        id: 4,
        title: "Solidaritat Canina",
        category: "PROTECTORA",
        year: "2024",
        stat: "952€",
        image: "/dogs.png",
        description: "Jornada d'escalada a Blanes que va recaptar fons per a la protectora d'animals de Tossa de Mar.",
        fullContent: `
            <p class="lead text-xl font-light mb-8 text-stone-900">Una jornada inoblidable d'escalada, somriures i solidaritat a la sala Golem. Entre tots vam aconseguir aportar el nostre granet de sorra per als animals que més ho necessiten.</p>

            <div class="bg-gradient-to-r from-emerald-50 to-teal-50 p-8 rounded-xl border border-emerald-100 shadow-sm my-10 text-center not-prose">
                <span class="block text-sm font-bold text-emerald-800 uppercase tracking-widest mb-2">Recaptació Total</span>
                <span class="block text-6xl md:text-7xl font-display font-bold text-emerald-600 mb-2">952€</span>
                <span class="inline-block bg-white px-4 py-1 rounded-full text-sm font-medium text-emerald-800 border border-emerald-100 shadow-sm">Destinats íntegrament als animals</span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 my-10 not-prose">
                 <div class="bg-stone-50 p-8 rounded-lg border-l-4 border-alpine-500">
                    <h4 class="text-lg font-bold text-alpine-900 uppercase mb-2">📍 Sala Golem Blanes</h4>
                    <p class="text-stone-600">Menció especial per a ells. Ens van cedir l'espai i van col·laborar activament en l'organització de l'esdeveniment.</p>
                </div>
                <div class="bg-stone-50 p-8 rounded-lg border-l-4 border-alpine-500">
                    <h4 class="text-lg font-bold text-alpine-900 uppercase mb-2">🤝 Associació Chari Cruz</h4>
                    <p class="text-stone-600">Protectora de gossos i gats de Tossa de Mar. Fan una feina incansable per donar una segona oportunitat als animals abandonats.</p>
                </div>
            </div>

            <h3 class="text-2xl font-bold mb-4 font-display uppercase text-alpine-900">Com va funcionar?</h3>
            <p class="mb-6">L'entrada a la sala tenia un caràcter solidari de <strong>5€</strong>. La resposta de la gent va ser espectacular, omplint la sala de bon ambient i ganes d'ajudar.</p>
            
            <p>Gràcies a tothom qui va venir a escalar, a fer-se una cervesa o simplement a donar suport. Aquests fons es convertiran en aliment, medecines i cures veterinàries.</p>
        `
    }
];
