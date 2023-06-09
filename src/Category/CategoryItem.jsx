import React from "react";


const CategoryItem = ({ item, categoryParameters, setCategoryParameters }) => {

    return (<>
        <div >
            {categoryParameters.id == item.id ?
                (
                    <div
                        onClick={() => setCategoryParameters((prev) => ({ ...prev, id: '' }))}
                        className="w-full rounded-lg py-2 px-1 cursor-pointer items-center justify-center flex flex-row flex-nowrap gap-5 font-semibold text-purple-50 bg-indigo-700">
                        <p className="truncate">{item.name}</p>
                    </div>
                )
                : (
                    <div
                        onClick={() => setCategoryParameters((prev) => ({ ...prev, id: item.id }))}
                        className="w-full rounded-lg py-2 px-1 cursor-pointer hover:bg-violet-600 items-center justify-center flex flex-row flex-nowrap gap-5 font-semibold text-purple-50">
                        <p className="truncate">{item.name}</p>
                    </div>
                )}
        </div>
    </>);
};

export default CategoryItem;