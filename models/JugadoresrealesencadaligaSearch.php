<?php

namespace app\models;

use yii\base\Model;
use yii\data\ActiveDataProvider;
use app\models\Jugadoresrealesencadaliga;

/**
 * JugadoresrealesencadaligaSearch represents the model behind the search form of `app\models\Jugadoresrealesencadaliga`.
 */
class JugadoresrealesencadaligaSearch extends Jugadoresrealesencadaliga
{
    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['idJugadorReal', 'idLiga', 'idEquipoUser', 'valorTransferencia'], 'integer'],
            [['titular', 'mercado'], 'boolean'],
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
        $query = Jugadoresrealesencadaliga::find();

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
            'idJugadorReal' => $this->idJugadorReal,
            'idLiga' => $this->idLiga,
            'idEquipoUser' => $this->idEquipoUser,
            'titular' => $this->titular,
            'mercado' => $this->mercado,
            'valorTransferencia' => $this->valorTransferencia,
        ]);

        return $dataProvider;
    }
}
