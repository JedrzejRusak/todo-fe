import React from "react";


const TaskItem = ({ item, categoryParameters, setCategoryParameters }) => {

    return (<>
        <div >
            {categoryParameters.id == item.id ?
                (
                    <div
                        onClick={() => setCategoryParameters((prev) => ({ ...prev, id: '' }))}
                        className="w-full rounded-lg py-2 px-1 cursor-pointer items-center justify-center flex flex-row flex-nowrap gap-5 font-semibold text-purple-50 bg-indigo-700">
                        <p className="truncate">{item.category.name}:</p>
                        <p className="truncate">{item.name}</p>
                        <p className="truncate">{item.description}</p>
                    </div>
                )
                : (
                    <div
                        onClick={() => setCategoryParameters((prev) => ({ ...prev, id: item.id }))}
                        className={`${item.isDone > 0 ? ('bg-green-500') : (item.priority > 0 ? (
                            item.priority > 10 ? (
                                item.priority > 20 ? (
                                    item.priority > 30 ? (
                                        item.priority > 40 ? (
                                            item.priority > 50 ? (
                                                item.priority > 60 ? (
                                                    item.priority > 70 ? (
                                                        item.priority > 80 ? (
                                                            item.priority > 90 ? ('bg-red-950') : ('bg-red-900')
                                                        ) : ('bg-red-800')
                                                    ) : ('bg-red-700')
                                                ) : ('bg-red-500')
                                            ) : ('bg-orange-600')
                                        ) : ('bg-orange-500')
                                    ) : ('bg-orange-400')
                                ) : ('bg-orange-300')
                            ) : ('bg-orange-200')
                        ) : (''))} w-full rounded-lg py-2 px-1 cursor-pointer hover:bg-violet-600 items-center justify-center flex flex-row flex-nowrap gap-5 font-semibold text-purple-50`}>
                        <p className="truncate">{item.category.name}:</p>
                        <p className="truncate">{item.name}</p>
                        <p className="truncate">{item.description}</p>
                    </div>
                )}
        </div>
    </>);
};

export default TaskItem;