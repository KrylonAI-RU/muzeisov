import React, { useState } from 'react';
import { Layers, Compass, Info } from 'lucide-react';
import { EXHIBITS_DATA, Exhibit } from '../data/exhibits';

interface MuseumHallPlanProps {
  onSelectExhibit: (exhibit: Exhibit) => void;
}

interface Zone {
  id: string;
  name: string;
  floor: 1 | 2;
  borderColor: string;
  description: string;
  exhibits: string[];
}

const ZONES: Zone[] = [
  {
    id: 'naval',
    name: 'Зал «Морской рубеж»',
    floor: 1,
    borderColor: '#0284c7',
    description: 'Оптические симуляторы торпедных атак с аутентичными перископами боевых подлодок СССР.',
    exhibits: ['morskoi-boi'],
  },
  {
    id: 'racing',
    name: 'Зал «Советское автошоссе»',
    floor: 1,
    borderColor: '#dc2626',
    description: 'Электронные гоночные аппараты 70-х годов с механическими рулями, коробками передач и педалями.',
    exhibits: ['magistral'],
  },
  {
    id: 'sports',
    name: 'Зал «Спорт и меткость»',
    floor: 2,
    borderColor: '#16a34a',
    description: 'Тир «Снайпер», купольный «Баскетбол» и электронные «Городки» на базе микроконтроллеров.',
    exhibits: ['gorodki', 'sniper-2', 'basketball'],
  },
  {
    id: 'buffet',
    name: 'Советский ретро-буфет',
    floor: 1,
    borderColor: '#ea580c',
    description: 'Действующие автоматы газированной воды АТ-114, молочные коктейли «Воронеж-2» и фотокабина.',
    exhibits: ['at-114'],
  },
  {
    id: 'workshop',
    name: 'Мастерская инженеров-реставраторов',
    floor: 2,
    borderColor: '#a855f7',
    description: 'Открытая лаборатория, где мастера восстанавливают релейные блоки и оптику 50-летней давности.',
    exhibits: [],
  },
];

export const MuseumHallPlan: React.FC<MuseumHallPlanProps> = ({ onSelectExhibit }) => {
  const [selectedFloor, setSelectedFloor] = useState<1 | 2>(1);
  const [activeZoneId, setActiveZoneId] = useState<string>('naval');

  const activeZone = ZONES.find((z) => z.id === activeZoneId) || ZONES[0];
  const activeExhibits = EXHIBITS_DATA.filter((e) => activeZone.exhibits.includes(e.id));

  return (
    <section id="hall-plan" className="py-16 bg-[#14171d] border-t border-stone-800 text-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-widest">
              <Compass className="w-3.5 h-3.5" />
              <span>Интерактивная карта экспозиции</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold font-display text-white mt-1 uppercase">
              Схема залов музея на Конюшенной
            </h2>
            <p className="text-sm text-stone-400 mt-2 max-w-2xl">
              Нажмите на зону экспозиции или выберите этаж, чтобы узнать расположение 
              автоматов и посмотреть их паспорта.
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-stone-900 border border-stone-800 self-start md:self-auto">
            <button
              onClick={() => {
                setSelectedFloor(1);
                setActiveZoneId('naval');
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold font-soviet-mono transition-colors ${
                selectedFloor === 1
                  ? 'bg-amber-600 text-stone-950 font-bold'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              1-й ЭТАЖ (ОСНОВНОЙ)
            </button>
            <button
              onClick={() => {
                setSelectedFloor(2);
                setActiveZoneId('sports');
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold font-soviet-mono transition-colors ${
                selectedFloor === 2
                  ? 'bg-amber-600 text-stone-950 font-bold'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              2-й ЭТАЖ (ГАЛЕРЕЯ)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 p-5 rounded-xl bg-stone-900 border border-stone-800 relative overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800 text-xs font-soviet-mono text-stone-400">
              <span className="flex items-center gap-1.5 text-amber-400">
                <Layers className="w-4 h-4 text-amber-400" />
                АРХИТЕКТУРНЫЙ ПЛАН: ЭТАЖ #{selectedFloor}
              </span>
              <span>КОНЮШЕННАЯ ПЛОЩАДЬ, 2В</span>
            </div>

            <div className="relative my-4 aspect-[16/9] w-full bg-stone-950 rounded-lg border border-stone-800 p-4 overflow-hidden flex items-center justify-center">
              {selectedFloor === 1 ? (
                <div className="relative w-full h-full grid grid-cols-12 grid-rows-6 gap-3 p-1">
                  {/* Zone 1: Naval */}
                  <div
                    onClick={() => setActiveZoneId('naval')}
                    className={`col-span-6 row-span-4 rounded-lg border p-3 transition-colors cursor-pointer flex flex-col justify-between ${
                      activeZoneId === 'naval'
                        ? 'border-cyan-400 bg-cyan-950/40'
                        : 'border-cyan-900 bg-stone-900 hover:border-cyan-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-soviet-mono font-bold text-cyan-300">
                        ЗОНА 01: МОРСКОЙ РУБЕЖ
                      </span>
                    </div>
                    <div className="space-y-0.5">
                      <div className="text-xs font-bold text-white">«Морской бой» (1973)</div>
                      <div className="text-[10px] text-stone-400">Перископы · Торпедные аппараты</div>
                    </div>
                  </div>

                  {/* Zone 2: Racing */}
                  <div
                    onClick={() => setActiveZoneId('racing')}
                    className={`col-span-6 row-span-4 rounded-lg border p-3 transition-colors cursor-pointer flex flex-col justify-between ${
                      activeZoneId === 'racing'
                        ? 'border-red-400 bg-red-950/40'
                        : 'border-red-900 bg-stone-900 hover:border-red-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-soviet-mono font-bold text-red-300">
                        ЗОНА 02: АВТОШОССЕ
                      </span>
                    </div>
                    <div className="space-y-0.5">
                      <div className="text-xs font-bold text-white">«Магистраль» & «Авторалли»</div>
                      <div className="text-[10px] text-stone-400">Рули · Педали · Табло скорости</div>
                    </div>
                  </div>

                  {/* Zone 3: Buffet */}
                  <div
                    onClick={() => setActiveZoneId('buffet')}
                    className={`col-span-8 row-span-2 rounded-lg border p-3 transition-colors cursor-pointer flex items-center justify-between ${
                      activeZoneId === 'buffet'
                        ? 'border-amber-400 bg-amber-950/40'
                        : 'border-amber-900 bg-stone-900 hover:border-amber-700'
                    }`}
                  >
                    <div>
                      <span className="text-[11px] font-soviet-mono font-bold text-amber-300 block">
                        ЗОНА 03: РЕТРО-БУФЕТ СССР
                      </span>
                      <span className="text-xs font-bold text-white">Автоматы газводы АТ-114 · Коктейли</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-950 text-amber-200 font-soviet-mono border border-amber-800">
                      1 и 3 коп.
                    </span>
                  </div>

                  {/* Entrance */}
                  <div className="col-span-4 row-span-2 rounded-lg border border-stone-800 bg-stone-900 p-3 flex flex-col justify-center items-center text-center">
                    <span className="text-[10px] font-soviet-mono text-stone-500">ГЛАВНЫЙ ВХОД</span>
                    <span className="text-xs font-semibold text-stone-300">Касса и выдача монет</span>
                  </div>
                </div>
              ) : (
                <div className="relative w-full h-full grid grid-cols-12 grid-rows-6 gap-3 p-1">
                  <div
                    onClick={() => setActiveZoneId('sports')}
                    className={`col-span-7 row-span-6 rounded-lg border p-4 transition-colors cursor-pointer flex flex-col justify-between ${
                      activeZoneId === 'sports'
                        ? 'border-green-400 bg-green-950/40'
                        : 'border-green-900 bg-stone-900 hover:border-green-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-soviet-mono font-bold text-green-300">
                        ЗОНА 04: СПОРТ И МЕТКОСТЬ
                      </span>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm font-bold text-white">«Городки», «Снайпер-2», «Баскетбол»</div>
                      <div className="text-xs text-stone-400">
                        Купольный баскетбол и оптический тир ТОЗ
                      </div>
                    </div>
                    <div className="text-[10px] font-soviet-mono text-green-400">
                      3 ключевых экспоната
                    </div>
                  </div>

                  <div
                    onClick={() => setActiveZoneId('workshop')}
                    className={`col-span-5 row-span-6 rounded-lg border p-4 transition-colors cursor-pointer flex flex-col justify-between ${
                      activeZoneId === 'workshop'
                        ? 'border-purple-400 bg-purple-950/40'
                        : 'border-purple-900 bg-stone-900 hover:border-purple-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-soviet-mono font-bold text-purple-300">
                        ЗОНА 05: МАСТЕРСКАЯ
                      </span>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm font-bold text-white">Ремонт реле и плат</div>
                      <div className="text-xs text-stone-400">
                        Открытая мастерская инженеров
                      </div>
                    </div>
                    <div className="text-[10px] font-soviet-mono text-purple-400">
                      Реставрация техники
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Details */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-5 rounded-xl bg-stone-900 border border-stone-800 space-y-4">
              <div className="flex items-center justify-between">
                <span
                  style={{ color: activeZone.borderColor }}
                  className="text-xs font-soviet-mono font-bold uppercase tracking-wider"
                >
                  {activeZone.floor}-й этаж музея
                </span>
                <span className="text-xs text-stone-400">
                  {activeExhibits.length} {activeExhibits.length === 1 ? 'экспонат' : 'экспоната'}
                </span>
              </div>

              <h3 className="font-display text-lg text-white font-bold">
                {activeZone.name}
              </h3>

              <p className="text-xs text-stone-300 leading-relaxed">
                {activeZone.description}
              </p>

              <div className="pt-2 space-y-2">
                <div className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                  Автоматы в этой зоне:
                </div>

                {activeExhibits.length > 0 ? (
                  activeExhibits.map((exhibit) => (
                    <div
                      key={exhibit.id}
                      className="p-3 rounded-lg bg-stone-950 border border-stone-800 flex items-center justify-between"
                    >
                      <div>
                        <div className="text-xs font-bold text-white">
                          {exhibit.name} ({exhibit.year})
                        </div>
                        <div className="text-[10px] text-stone-400">
                          {exhibit.factory}
                        </div>
                      </div>

                      <button
                        onClick={() => onSelectExhibit(exhibit)}
                        className="p-1.5 rounded bg-stone-800 hover:bg-amber-600 text-stone-300 hover:text-stone-950 transition-colors text-xs flex items-center gap-1 font-medium"
                      >
                        <Info className="w-3.5 h-3.5" />
                        <span>Обзор</span>
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="p-3 rounded-lg bg-stone-950 border border-stone-800 text-xs text-stone-400">
                    Здесь можно наблюдать за процессом пайки и восстановления оригинальных советских аппаратов.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
