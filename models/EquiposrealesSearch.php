<?php

namespace app\models;

use yii\base\Model;
use yii\data\ActiveDataProvider;
use app\models\Equiposreales;

/**
 * EquiposrealesSearch represents the model behind the search form of `app\models\Equiposreales`.
 */
class EquiposrealesSearch extends Equiposreales
{
    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['id', 'puntos', 'valor', 'partidosJugados', 'victorias', 'derrotas', 'empates', 'jugadores', 'lesionados'], 'integer'],
            [['nombre', 'foto'], 'safe'],
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
        $query = Equiposreales::find();

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
            'puntos' => $this->puntos,
            'valor' => $this->valor,
            'partidosJugados' => $this->partidosJugados,
            'victorias' => $this->victorias,
            'derrotas' => $this->derrotas,
            'empates' => $this->empates,
            'jugadores' => $this->jugadores,
            'lesionados' => $this->lesionados,
        ]);

        $query->andFilterWhere(['like', 'nombre', $this->nombre])
            ->andFilterWhere(['like', 'foto', $this->foto]);

        return $dataProvider;
    }
}
