<?php

namespace app\models;

use yii\base\Model;
use yii\data\ActiveDataProvider;
use app\models\Infojugadoresenpartido;

/**
 * InfojugadoresenpartidoSearch represents the model behind the search form of `app\models\Infojugadoresenpartido`.
 */
class InfojugadoresenpartidoSearch extends Infojugadoresenpartido
{
    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['id', 'idPartido', 'idJugador', 'goles', 'amarillas', 'puntos'], 'integer'],
            [['titular', 'rojaDirecta'], 'boolean'],
            [['juegoEnPartido'], 'safe'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function scenarios()
    {
        // bypass scenarios() implementation in the parent class
        return Model::scenarios();
    }

    /**
     * Creates data provider instance with search query applied
     *
     * @param array $params
     *
     * @return ActiveDataProvider
     */
    public function search($params)
    {
        $query = Infojugadoresenpartido::find();

        // add conditions that should always apply here

        $dataProvider = new ActiveDataProvider([
            'query' => $query,
        ]);

        $this->load($params);

        if (!$this->validate()) {
            // uncomment the following line if you do not want to return any records when validation fails
            // $query->where('0=1');
            return $dataProvider;
        }

        // grid filtering conditions
        $query->andFilterWhere([
            'id' => $this->id,
            'idPartido' => $this->idPartido,
            'idJugador' => $this->idJugador,
            'titular' => $this->titular,
            'goles' => $this->goles,
            'amarillas' => $this->amarillas,
            'rojaDirecta' => $this->rojaDirecta,
            'puntos' => $this->puntos,
        ]);

        $query->andFilterWhere(['like', 'juegoEnPartido', $this->juegoEnPartido]);

        return $dataProvider;
    }
}
