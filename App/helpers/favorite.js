import AsyncStorage from "@react-native-async-storage/async-storage";

export async function insertValue(value) {
  try {
    if (await AsyncStorage.getItem("data_house")) {
      // caso ja existir a lista, adicionar nela.

      if (!(await verifyIsFavorite(value))) {
        // verificacao para n adicionar quem ja esta na lista
        let oldList = await getValueLocal();
        let newList = oldList.split(",");
        newList.push(value); // adiciona esse valor na lista

        // salvar a nova lista
        await AsyncStorage.setItem("data_house", newList.toString());
      }
      return true;
    } else {
      // caso nao existir na memoria (null), criar com esse numero
      await AsyncStorage.setItem("data_house", value);
      return true;
    }
  } catch (e) {
    return false;
  }
}

export async function removeValue(value) {
  try {
    if (await AsyncStorage.getItem("data_house")) {
      if (await verifyIsFavorite(value)) {
        // verifica se realmente esta como fav

        let oldList = await getValueLocal();
        let newList = oldList.split(",");

        let index = newList.indexOf(value);
        if (index > -1) newList.splice(index, 1);

        // salvar a nova lista
        await AsyncStorage.setItem("data_house", newList.toString());
      }
      return true;
    } else {
      return true;
    }
  } catch (e) {
    return false;
  }
}

export async function getValueLocal() {
  // retorna os ids favoritos. Ex.: 1, 20, 58, ...
  return await AsyncStorage.getItem("data_house");
}

// retorna se uma casa (por id) eh favorito
export async function verifyIsFavorite(id) {
  // pega todos valores do array salvo
  const favorites = await getValueLocal();
  // verifica se a posicao do ID nessa tabela nao eh negativa
  // se for negativo, significa que nao existe.
  // retorna boolean
  if (!favorites) return false;
  return favorites.split(",").indexOf(id) > -1;
}
