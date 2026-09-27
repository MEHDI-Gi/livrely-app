if(NOT TARGET react-native-worklets::worklets)
add_library(react-native-worklets::worklets SHARED IMPORTED)
set_target_properties(react-native-worklets::worklets PROPERTIES
    IMPORTED_LOCATION "/home/mid/Desktop/livrely-app/node_modules/react-native-worklets/android/build/intermediates/cxx/Debug/101r3n3c/obj/x86/libworklets.so"
    INTERFACE_INCLUDE_DIRECTORIES "/home/mid/Desktop/livrely-app/node_modules/react-native-worklets/android/build/prefab-headers/worklets"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

