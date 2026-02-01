import React, { useState, useMemo } from 'react';
import pokemonData from '../data/pokemons.json';
import {
    Search, MapPin, Shield, Zap, RotateCcw,
    Globe, Coins, Swords, Hash
} from 'lucide-react';

const Pokedex = () => {
    const initialFilters = {
        name: '',
        role: '',
        team: '',
        type1: '',
        type2: '',
        region: ''
    };

    const [filters, setFilters] = useState(initialFilters);

    // Opções fixas de Região conforme solicitado
    const regionOptions = [
        "Kanto", "Johto", "Orre", "Expedition(300)",
        "Expedition(400)", "Maniac", "Saffari Fossil(Pewter)", "Saffari Fossil(Fuschia)"
    ];

    // Extração dinâmica de opções do JSON
    const uniqueRoles = [...new Set(pokemonData.map(p => p.role))].filter(Boolean);
    const uniqueTeams = [...new Set(pokemonData.map(p => p.team))].filter(Boolean);
    const uniqueTypes = [...new Set(pokemonData.flatMap(p => [p.type1, p.type2]).filter(Boolean))].sort();

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const clearFilters = () => setFilters(initialFilters);

    const filteredPokemons = useMemo(() => {
        return pokemonData.filter(pokemon => {
            const matchesName = pokemon.name.toLowerCase().includes(filters.name.toLowerCase()) ||
                pokemon.dexNumber.toString().includes(filters.name);
            const matchesRole = filters.role ? pokemon.role === filters.role : true;
            const matchesTeam = filters.team ? pokemon.team === filters.team : true;
            const matchesType1 = filters.type1 ? pokemon.type1 === filters.type1 : true;
            const matchesType2 = filters.type2 ? pokemon.type2 === filters.type2 : true;
            const matchesRegion = filters.region ? pokemon.region === filters.region : true;

            return matchesName && matchesRole && matchesTeam && matchesType1 && matchesType2 && matchesRegion;
        });
    }, [filters]);

    const inputStyles = "w-full bg-slate-900 border border-slate-700 rounded-lg py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all hover:border-slate-500 text-slate-200 shadow-inner";

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">

                {/* Top Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 border-b border-slate-800 pb-6">
                    <div>
                        <h1 className="text-3xl font-black tracking-tighter text-white flex items-center gap-2">
                            <span className="bg-blue-600 px-2 py-1 rounded">POKÉ</span> EXPLORER
                        </h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Resultados</span>
                        <span className="bg-slate-900 border border-slate-700 px-4 py-1 rounded-full font-mono text-blue-400">
                            {filteredPokemons.length}
                        </span>
                    </div>
                </div>

                {/* Painel de Filtros */}
                <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 backdrop-blur-sm mb-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">

                        {/* Nome / ID */}
                        <div className="relative">
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                            <input
                                type="text"
                                name="name"
                                placeholder="Nome ou Dex..."
                                value={filters.name}
                                onChange={handleFilterChange}
                                className={`${inputStyles} pl-10`}
                            />
                        </div>

                        {/* Role */}
                        <select name="role" value={filters.role} onChange={handleFilterChange} className={inputStyles}>
                            <option value="">Role: Todas</option>
                            {uniqueRoles.map(r => <option key={r} value={r}>{r}</option>)}
                        </select>

                        {/* Team */}
                        <select name="team" value={filters.team} onChange={handleFilterChange} className={inputStyles}>
                            <option value="">Time: Todos</option>
                            {uniqueTeams.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>

                        {/* Tipo 1 */}
                        <select name="type1" value={filters.type1} onChange={handleFilterChange} className={inputStyles}>
                            <option value="">Tipo 1: Todos</option>
                            {uniqueTypes.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>

                        {/* Tipo 2 - ADICIONADO AQUI */}
                        <select name="type2" value={filters.type2} onChange={handleFilterChange} className={inputStyles}>
                            <option value="">Tipo 2: Todos</option>
                            {uniqueTypes.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>

                        {/* Região */}
                        <select name="region" value={filters.region} onChange={handleFilterChange} className={inputStyles}>
                            <option value="">Região: Todas</option>
                            {regionOptions.map(reg => <option key={reg} value={reg}>{reg}</option>)}
                        </select>

                        {/* Limpar Filtros */}
                        <button
                            onClick={clearFilters}
                            className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-red-500/20 text-red-400 border border-slate-700 hover:border-red-500/50 rounded-lg py-2 transition-all active:scale-95"
                        >
                            <RotateCcw size={16} />
                            <span className="text-xs font-bold uppercase">Reset</span>
                        </button>

                    </div>
                </div>

                {/* Grid de Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredPokemons.map(pokemon => (
                        <div key={pokemon.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all group shadow-lg">

                            {/* Badge de Preço e Ativo */}
                            <div className="p-4 flex justify-between items-center bg-slate-900/80 border-b border-slate-800">
                                <span className="text-emerald-400 font-mono text-sm flex items-center gap-1">
                                    <Coins size={14} /> ${pokemon.price}
                                </span>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-bold text-slate-500">LV. {pokemon.level}</span>
                                    <div className={`h-2 w-2 rounded-full ${pokemon.active ? 'bg-green-500' : 'bg-red-500'}`} />
                                </div>
                            </div>

                            {/* Imagem com Dex Number no fundo */}
                            <div className="relative h-48 flex justify-center items-center bg-gradient-to-b from-slate-800/50 to-transparent">
                                <span className="absolute text-7xl font-black text-white/5 select-none -z-0">
                                    #{pokemon.dexNumber}
                                </span>
                                <img
                                    src={pokemon.image}
                                    alt={pokemon.name}
                                    className="h-36 w-36 object-contain z-10 group-hover:scale-110 transition-transform duration-300 drop-shadow-2xl"
                                />
                            </div>

                            {/* Detalhes */}
                            <div className="p-5 pt-0 text-center">
                                <h2 className="text-xl font-bold text-white mb-1">{pokemon.name}</h2>
                                <p className="text-xs text-slate-400 flex items-center justify-center gap-1 mb-4">
                                    <Swords size={12} className="text-blue-500" /> Moveset: {pokemon.moveset}
                                </p>

                                <div className="flex flex-wrap justify-center gap-2">
                                    {pokemon.role != null && (
                                        <span className="text-[10px] px-2 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 font-bold uppercase italic">
                                            {pokemon.role}
                                        </span>
                                    )}
                                    <span className="text-[10px] px-2 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700 font-bold uppercase">
                                        {pokemon.type1}
                                    </span>
                                    {pokemon.type2 && (
                                        <span className="text-[10px] px-2 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700 font-bold uppercase">
                                            {pokemon.type2}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Pokedex;