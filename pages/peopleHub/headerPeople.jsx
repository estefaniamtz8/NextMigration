import React from 'react';
import { BsFilter, BsWhatsapp } from "react-icons/bs";
import {useDispatch} from "react-redux";
import {setFiltersRedux} from "../../redux/actions/filters_actions";

/**
 * Componente de encabezado para la sección de personas.
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {Function} props.onChangeInputFilter - Función para manejar cambios en el filtro de búsqueda.
 * @param {Function} props.setOpenModalPersonalizedMessageLeads - Función para abrir el modal de mensajes personalizados.
 * @param {Object} props.filter - Objeto de filtro.
 * @param {Function} props.setRangeFilterMatches - Función para establecer el rango de filtros de coincidencias.
 * @param {Function} props.setFilter - Función para establecer el filtro.
 * @param {Object} props.initialFilterState - Estado inicial del filtro.
 * @param {Function} props.excelExport - Función para exportar a Excel.
 * @param {Function} props.setDataPopoverFilter - Función para establecer el popover de filtros de datos.
 * @returns {JSX.Element} Elemento JSX que representa el encabezado.
 */
function HeaderPeople({
  onChangeInputFilter,
  setOpenModalPersonalizedMessageLeads,
  filter,
  setRangeFilterMatches,
  setFilter,
  initialFilterState,
  excelExport,
  setDataPopoverFilter,
}) {
  const dispatch = useDispatch();
  /**
   * Verifica si los filtros son iguales.
   * @function
   * @returns {boolean} True si los filtros son iguales, False en caso contrario.
   */
  const areFiltersEqual = () => {
    const filter1 = { ...filter };
    const filter2 = { ...initialFilterState };
    delete filter1.page;
    delete filter2.page;
    delete filter1.numPages;
    delete filter2.numPages;
    delete filter1.pageSize;
    delete filter2.pageSize;
    return JSON.stringify(filter1) === JSON.stringify(filter2);
  };
  function handleClearFilter() {
    setFilter(initialFilterState);
    setRangeFilterMatches([0, 100]);
    dispatch(setFiltersRedux(initialFilterState));
  }

  return (
    <header>
      <div className="relative flex flex-wrap justify-between pb-10">
        <input
          className="w-[30%] rounded-lg border-none bg-white px-4 py-3 font-sans outline-none placeholder:text-black"
          id="textSearch"
          name="textSearch"
          type="text"
          onChange={onChangeInputFilter}
          value={filter?.textSearch}
          placeholder="Buscar por palabra clave"
        />
        <div className="flex gap-[20px]">
          {!areFiltersEqual() && (
            <button
              onClick={() => handleClearFilter()}
              className="px-8 py-2 text-white border-0 rounded-lg outline-none cursor-pointer bg-purple300"
              type="button"
            >
              Limpiar filtros
            </button>
          )}
          <button
            onClick={() => setOpenModalPersonalizedMessageLeads(true)}
            className="px-4 py-2 text-white border-0 rounded-lg outline-none cursor-pointer bg-purple300"
            type="button"
          >
            <BsWhatsapp size={20} />
          </button>
          <button
            onClick={excelExport}
            className="px-8 py-2 text-white border-0 rounded-lg outline-none cursor-pointer bg-purple300"
            type="button"
          >
            Generar reporte
          </button>
          <button
            onClick={(event) => {
              setDataPopoverFilter((prevState) => ({
                ...prevState,
                anchorEl: event.currentTarget,
                open: true,
              }));
            }}
            className="cursor-pointer rounded-lg border-0 bg-purple300 px-2.5 py-2 text-white outline-none"
            type="button"
          >
            <BsFilter id="icon" size={25} />
          </button>
        </div>
      </div>
    </header>
  );
}

export default HeaderPeople;
